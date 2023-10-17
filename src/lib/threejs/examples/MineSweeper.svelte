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
   */
  // make a cube that has the following state
  // 1. active / inactive
  // 2. edge / non edge
  // 3. mine / no mine
  // 4. number of adjacent mines

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

  // will randomize in future + set after first click
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
  console.log(grid);

  onMount(() => {
    const { width, height } = getCanvasDims();
    const scene = new THREE.Scene();

    // https://threejs.org/docs/#api/en/loaders/CubeTextureLoader cube faces

    const field = new THREE.Group();
    scene.add(field);

    // draw a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: colors.lightGreen });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // camera
    const camera = new THREE.PerspectiveCamera(75, width / height);
    camera.position.z = 4; // move camera in front of cube by moving camera along z access
    scene.add(camera);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("mineField") ?? undefined,
    });

    renderer.setSize(width, height);
    renderer.render(scene, camera);
  });
</script>

<Example>
  <ExampleMarkdown />
  <canvas id="mineField" slot="live" />
</Example>
