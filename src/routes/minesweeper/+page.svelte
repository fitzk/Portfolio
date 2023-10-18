<!-- @ts-check -->
<script lang="ts">
  import { onMount } from "svelte";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  // @ts-ignore it's a markdown file
  import { getCanvasDims } from "$lib/util";

  // Rules
  /**
   * 1. each box has a number indicating how many mines are around it, mines that are diagnal to the cube are included in this count
   * 2. if you click on a mine you loose!  when they loose the game reveals all mines
   * 3. when a clear tile is clicked, adjuacent tiles without mines are also clearedf
   */
  // make a cube that has the following state
  // 1. active / inactive
  // 2. edge / non edge
  // 3. mine / no mine
  // 4. number of adjacent mines
  let intersects = [];
  let hovered = {};

  // simple matrix
  const grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const active = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ];

  function getNeighbors(row: number, column: number) {
    const neighbors = [];

    // prev row
    if (row > 0) {
      const prevRow = row - 1;
      // left cell
      if (column > 0) {
        neighbors.push([prevRow, column - 1]);
      }
      // center cell
      neighbors.push([prevRow, column]);

      // right cell
      if (column < grid[prevRow].length - 1) {
        neighbors.push([prevRow, column + 1]);
      }
    }

    // this row
    // left cell
    if (column > 0) {
      neighbors.push([row, column - 1]);
    }
    // right cell
    if (column < grid[row].length - 1) {
      neighbors.push([row, column + 1]);
    }

    // next row
    const finalRow = grid.length - 1;
    if (row < finalRow) {
      const nextRow = row + 1;
      // left cell
      if (column > 0) {
        neighbors.push([nextRow, column - 1]);
      }
      // center cell
      neighbors.push([nextRow, column]);
      // right cell
      if (column < grid[nextRow].length - 1) {
        neighbors.push([nextRow, column + 1]);
      }
    }

    return neighbors;
  }

  let neighbors: number[][] = [];

  // TODO: randomize
  // TODO: set after first click
  const mines = [
    [0, 0],
    [1, 3],
    [3, 2],
  ];

  mines.forEach(([row, column]) => {
    grid[row][column] = -1;
    const mineNeighbors = getNeighbors(row, column);
    neighbors = [...neighbors, ...mineNeighbors];
  });

  // set # of neighboring mines for each regular cell
  neighbors.forEach(([row, column]) => {
    if (grid[row][column] !== -1) {
      grid[row][column] += 1;
    }
  });

  // TODO: recursive clearing fn

  onMount(async () => {
    const { OrbitControls } = await import(
      "three/examples/jsm/controls/OrbitControls"
    );
    const guiLib = (await import("lil-gui")).default;

    const gui = new guiLib({
      container: document.getElementById("mineSweeperGUI") ?? undefined,
      autoPlace: false,
    });
    const { width, height } = getCanvasDims();
    const scene = new THREE.Scene();

    // axis helper
    const axisHelper = new THREE.AxesHelper(11);

    const canvas = document.getElementById("mineField");
    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas ?? undefined,
    });
    renderer.setSize(width, height);

    const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 10000);
    camera.position.set(0, 0, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    const helper = new THREE.CameraHelper(camera);
    const raycaster = new THREE.Raycaster(undefined, undefined, 0.2);
    const mouse = new THREE.Vector2();

    // https://threejs.org/docs/#api/en/loaders/CubeTextureLoader cube faces
    const grid: THREE.Mesh<
      THREE.BoxGeometry,
      THREE.MeshBasicMaterial,
      THREE.Object3DEventMap
    >[][] = [[], [], [], []];

    const mineField = new THREE.Group();
    scene.add(mineField);

    let row = 0;
    let column = 0;
    while (row < 4) {
      let color = column % 2 === 0 ? colors.lightGreen : colors.bitterSweet;

      if (row % 2 === 0) {
        color = column % 2 === 0 ? colors.bitterSweet : colors.lightGreen;
      }

      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color })
      );

      cube.position.y = row;
      cube.position.x = column;
      grid[row].push(cube);
      mineField.add(cube);

      column += 1;
      if (column === 4) {
        row += 1;
        column = 0;
      }
    }

    let intersects: THREE.Intersection<
      THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
    >[] = [];

    function onMouseMove(event: PointerEvent | MouseEvent) {
      mouse.x = (event.offsetX / width) * 2 - 1;
      mouse.y = -(event.offsetY / height) * 2 + 1;
    }

    function onClick() {
      raycaster.setFromCamera(mouse, camera);
      intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length) {
        intersects
          // We want to ignore any helpers we have loaded into the scene
          .filter((intersect) => intersect.object.type === "Mesh")
          .forEach((intersect) => {
            intersect.object.material.color.set(colors.mustard);
          });
      }
    }

    if (canvas) {
      canvas.addEventListener("mousemove", onMouseMove, false);
      canvas.addEventListener("click", onClick, false);
    }

    scene.add(helper);
    scene.add(axisHelper);
    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }

    animate();
  });
</script>

<canvas id="mineField" />
