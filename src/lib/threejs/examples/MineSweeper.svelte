<!-- @ts-check -->
<script lang="ts">
  import { onMount } from "svelte";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import Example from "$lib/threejs/Example.svelte";
  // @ts-ignore it's a markdown file
  import ExampleMarkdown from "./DrawCube.md";
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
    const guiLib = (await import("lil-gui")).default;

    const gui = new guiLib({
      container: document.getElementById("mineSweeperGUI") ?? undefined,
      autoPlace: false,
    });

    const { width, height } = getCanvasDims();
    const scene = new THREE.Scene();

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("mineField") ?? undefined,
    });
    renderer.setSize(width, height);

    // camera
    const camera = new THREE.PerspectiveCamera(75, width / height);
    camera.position.z = 4; // move camera in front of cube by moving camera along z access
    scene.add(camera);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    function onPointerMove(event: PointerEvent) {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    // https://threejs.org/docs/#api/en/loaders/CubeTextureLoader cube faces
    const firstRow = [];

    let index = 0;
    while (index < 4) {
      let color = index % 2 === 0 ? colors.lightGreen : colors.bitterSweet;
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color })
      );

      cube.position.x = index;
      firstRow.push(cube);
      scene.add(cube);

      index += 1;
    }

    gui.add(firstRow[0].position, "x").name("row 0, cube 0: x");
    gui.add(firstRow[1].position, "x").name("row 0, cube 1: x");
    gui.add(firstRow[2].position, "x").name("row 0, cube 2: x");
    gui.add(firstRow[3].position, "x").name("row 0, cube 3: x");

    let intersects: THREE.Intersection<
      THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
    >[] = [];

    window.addEventListener("pointermove", onPointerMove);

    window.addEventListener("click", () => {
      intersects = raycaster.intersectObjects(scene.children);
    });

    function animate() {
      if (intersects.length) {
        intersects.forEach((intersect) =>
          intersect.object.material.color.set(colors.mustard)
        );
      }
      raycaster.setFromCamera(pointer, camera);
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }

    animate();
  });
</script>

<div id="mineSweeperGUI" />
<canvas id="mineField" />
