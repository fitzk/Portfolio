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

  // TODO: recursive clearing fn

  // TODO: randomize
  // TODO: set after first click
  const mines = [
    [0, 0],
    [1, 3],
    [3, 2],
  ];

  const neighboringMineCount = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  function getNeighbors(row: number, column: number) {
    const coords = [];
    // prev row
    if (row > 0) {
      const prevRow = row - 1;
      // left cell
      if (column > 0) {
        coords.push([prevRow, column - 1]);
      }
      // center cell
      coords.push([prevRow, column]);
      // right cell
      if (column < neighboringMineCount[prevRow].length - 1) {
        coords.push([prevRow, column + 1]);
      }
    }
    // original row
    // left cell
    if (column > 0) {
      coords.push([row, column - 1]);
    }
    // right cell
    if (column < neighboringMineCount[row].length - 1) {
      coords.push([row, column + 1]);
    }
    // next row
    const finalRow = neighboringMineCount.length - 1;
    if (row < finalRow) {
      const nextRow = row + 1;
      // left cell
      if (column > 0) {
        coords.push([nextRow, column - 1]);
      }
      // center cell
      coords.push([nextRow, column]);
      // right cell
      if (column < neighboringMineCount[nextRow].length - 1) {
        coords.push([nextRow, column + 1]);
      }
    }
    return coords;
  }

  // sum # neighboring mines for each cube
  mines.forEach(([row, column]) => {
    neighboringMineCount[row][column] = -1;
    const mineNeighbors = getNeighbors(row, column);
    mineNeighbors.forEach(([row, column]) => {
      if (neighboringMineCount[row][column] !== -1) {
        neighboringMineCount[row][column] += 1;
      }
    });
  });

  onMount(async () => {
    const { OrbitControls } = await import(
      "three/examples/jsm/controls/OrbitControls"
    );

    const { width, height } = getCanvasDims();
    const scene = new THREE.Scene();
    const canvas = document.getElementById("mineField");
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas ?? undefined,
    });
    renderer.setSize(width, height);

    // camera
    const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 10000);
    camera.position.set(0, 0, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // used for interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // helpers
    const cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);
    const axisHelper = new THREE.AxesHelper(20);
    scene.add(axisHelper);

    // https://threejs.org/docs/#api/en/loaders/CubeTextureLoader cube faces
    const cubes: THREE.Mesh<
      THREE.BoxGeometry,
      THREE.MeshBasicMaterial,
      THREE.Object3DEventMap
    >[][] = [[], [], [], []];

    const mineField = new THREE.Group();
    scene.add(mineField);

    /**
     * grid is drawn bottom up, row 0 is closest to x axis
     */
    let row = 0;
    let column = 0;
    while (row < 4) {
      const hasMine = mines.some(
        (coords) => coords[0] === row && coords[1] === column
      );
      let color = column % 2 === 0 ? colors.lightGreen : colors.bitterSweet;
      if (row % 2 === 0) {
        color = column % 2 === 0 ? colors.bitterSweet : colors.lightGreen;
      }

      // uncomment to see mines
      // if (hasMine) {
      //   color = colors.black;
      // }

      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color })
      );

      cube.position.y = row;
      cube.position.x = column;
      cube.userData = {
        active: false,
        neighboringMineCount: neighboringMineCount[row][column],
        mine: hasMine,
      };
      cubes[row].push(cube);
      mineField.add(cube);

      column += 1;
      if (column === 4) {
        row += 1;
        column = 0;
      }
    }

    const maxDepth = 1000;
    let depthCounter = 0;

    function setActive(
      cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
    ) {
      if (cube.userData.mine) {
        alert("you lose!");
        return;
      }
      cube.userData.active = true;
      cube.material.color.set(colors.mustard);
      if (cube.userData.neighboringMineCount === 0) {
        const coords = getNeighbors(cube.position.y, cube.position.x);
        depthCounter += 1;

        if (depthCounter === maxDepth) {
          return;
        }
        coords.forEach(([row, column]) => {
          const neighborCube = cubes[row][column];
          if (!neighborCube.userData.mine) {
            if (neighborCube.userData.neighboringMineCount === 0) {
              setActive(neighborCube);
            }
          }
        });
      }
    }
    // event handlers
    // TODO: unregister
    function onMouseMove(event: PointerEvent | MouseEvent) {
      mouse.x = (event.offsetX / width) * 2 - 1;
      mouse.y = -(event.offsetY / height) * 2 + 1;
    }

    function onClick() {
      raycaster.setFromCamera(mouse, camera);
      let intersects: THREE.Intersection<
        THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
      >[] = [];
      intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length) {
        let cube;
        intersects
          // We want to ignore any helpers we have loaded into the scene
          .filter((intersect) => intersect.object.type === "Mesh")
          .forEach((intersect, idx) => {
            if (idx === 0) {
              cube = intersect.object;
            }
          });
        if (cube) {
          setActive(cube);
        }
      }
    }

    // event listeners
    if (canvas) {
      canvas.addEventListener("mousemove", onMouseMove, false);
      canvas.addEventListener("click", onClick, false);
    }

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
