<script lang="ts">
  import { Font } from "three/examples/jsm/loaders/FontLoader";
  import { getCanvasDims } from "$lib/util";
  import { onMount } from "svelte";
  import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import typeface from "three/examples/fonts/optimer_bold.typeface.json";

  /**
   * Rules
   * 1. each box has a number indicating how many mines are around it, mines that are diagnal to the cube are included in this count
   * 2. if you click on a mine you loose!  when they loose the game reveals all mines
   * 3. when a clear tile is clicked, adjuacent tiles without mines are also cleared
   * Behavior Notes
   * * cubes with neighboring mines should show the count
   */

  const ROWS = 12;
  const COLUMNS = 12;

  // TODO: set after first click
  const numMines = THREE.MathUtils.randInt(8, 12);
  let numActiveCubes = 0;
  let initialClick = false;

  let mines: Array<{ column: number; row: number }> = [];

  for (let i = 0; i < numMines; i++) {
    mines.push({
      column: THREE.MathUtils.randInt(0, ROWS - 1),
      row: THREE.MathUtils.randInt(0, COLUMNS - 1),
    });
  }

  // prepopulate mine counts matrix setting columns to 0 for each row
  const neighboringMineCounts: number[][] = [];
  for (let r = 0; r < ROWS; r++) {
    let arr = [];
    for (let c = 0; c < COLUMNS; c++) {
      arr.push(0);
    }
    neighboringMineCounts.push(arr);
  }
  /**
   * @returns Array of {row, column} objects of neighboring cubes
   * @param row - mesh.position.y
   * @param column - mesh.position.x
   */
  function getNeighbors(row: number, column: number) {
    const coords = [];
    // prev row
    if (row > 0) {
      const prevRow = row - 1;
      // left cell
      if (column > 0) {
        coords.push({ row: prevRow, column: column - 1 });
      }
      // center cell
      coords.push({ row: prevRow, column });
      // right cell
      if (column < neighboringMineCounts[prevRow].length - 1) {
        coords.push({ row: prevRow, column: column + 1 });
      }
    }
    // original row
    // left cell
    if (column > 0) {
      coords.push({ row: row, column: column - 1 });
    }
    // right cell
    if (column < neighboringMineCounts[row].length - 1) {
      coords.push({ row, column: column + 1 });
    }
    // next row
    const finalRow = neighboringMineCounts.length - 1;
    if (row < finalRow) {
      const nextRow = row + 1;
      // left cell
      if (column > 0) {
        coords.push({ row: nextRow, column: column - 1 });
      }
      // center cell
      coords.push({ row: nextRow, column });
      // right cell
      if (column < neighboringMineCounts[nextRow].length - 1) {
        coords.push({ row: nextRow, column: column + 1 });
      }
    }
    return coords;
  }

  // sum # neighboring mines for each cube
  mines.forEach(({ row, column }) => {
    neighboringMineCounts[row][column] = -1;
    const mineNeighbors = getNeighbors(row, column);
    mineNeighbors.forEach(({ row, column }) => {
      if (neighboringMineCounts[row][column] !== -1) {
        neighboringMineCounts[row][column] += 1;
      }
    });
  });

  onMount(async () => {
    const { OrbitControls } = await import(
      "three/examples/jsm/controls/OrbitControls"
    );
    const cubes: THREE.Mesh<
      THREE.BoxGeometry,
      THREE.MeshBasicMaterial,
      THREE.Object3DEventMap
    >[][] = [];
    const labels: { [key: string]: string | undefined } = {};

    const { width, height } = getCanvasDims();
    const scene = new THREE.Scene();
    const canvas = document.getElementById("mineField");
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas ?? undefined,
    });
    renderer.setSize(width, height);

    // camera
    const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // used for interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // helpers
    // const cameraHelper = new THREE.CameraHelper(camera);
    // scene.add(cameraHelper);
    // const axisHelper = new THREE.AxesHelper(20);
    // scene.add(axisHelper);

    // https://threejs.org/docs/#api/en/loaders/CubeTextureLoader cube faces

    const boardGroup = new THREE.Group();
    boardGroup.position.set(-5.5, -5.5, 0);
    scene.add(boardGroup);
    const cubeGroup = new THREE.Group();
    boardGroup.add(cubeGroup);
    const labelGroup = new THREE.Group();
    boardGroup.add(labelGroup);

    /**
     * Draw Grid
     * grid is drawn bottom up, row 0 is closest to x axis
     */
    let row = 0;
    let column = 0;

    while (row < ROWS) {
      if (!cubes[row]) {
        cubes[row] = [];
      }

      const hasMine = mines.some(
        (coords) => coords.row === row && coords.column === column,
      );

      let color = column % 2 === 0 ? colors.lightGreen : colors.greenBlue;
      if (row % 2 === 0) {
        color = column % 2 === 0 ? colors.greenBlue : colors.lightGreen;
      }

      // uncomment to see mines
      // if (hasMine) {
      //   color = colors.black;
      // }

      const neighboringMineCount = neighboringMineCounts[row][column];

      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color, opacity: 0.9, transparent: true }),
      );
      cube.position.y = row;
      cube.position.x = column;
      cube.userData = {
        active: false,
        neighboringMineCount,
        mine: hasMine,
      };
      cubes[row].push(cube);
      cubeGroup.add(cube);

      const labelGeometry = new TextGeometry(
        cube.userData.neighboringMineCount + "",
        {
          bevelEnabled: false,
          font: new Font(typeface),
          height: 1.05, // extrusion depth
          size: 0.5,
        },
      );

      labelGeometry.center();
      const label = new THREE.Mesh(
        labelGeometry,
        new THREE.MeshBasicMaterial({
          color: colors.black,
        }),
      );

      label.position.y = row;
      label.position.x = column;
      label.position.z = 0.02;
      label.visible = false;
      labelGroup.add(label);
      // store text id to toggle visibility later
      labels[cube.uuid] = label.uuid;

      column += 1;
      if (column === COLUMNS) {
        row += 1;
        column = 0;
      }
    }

    /**
     * mines should be visible on the board after this is called
     */
    function revealMines() {
      mines.forEach(({ row, column }) => {
        const cube = cubes[row][column];
        cube.material.color.set(colors.black);
      });
    }

    /**
     * Update active state on cube and reveal count (recursive)
     * @param cube unwrapped intersection object
     */
    function setActive(
      cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>,
    ) {
      if (!cube.userData.active) {
        numActiveCubes += 1;
      }
      cube.userData.active = true;
      // color cube for active state
      cube.material.color.set(colors.white);
      cube.material.opacity = 1;

      // check for loser
      if (cube.userData.mine) {
        revealMines();
        alert("you lose!");
        return;
      }

      // check for winner
      if (numActiveCubes === ROWS * COLUMNS - numMines + 1) {
        revealMines();
        alert("you win!");
        return;
      }

      const labelUUID = labels[cube.uuid];
      let label = labelGroup.getObjectByProperty("uuid", labelUUID);
      if (label && !label.visible && cube.userData.neighboringMineCount > 0) {
        label.visible = true;
      }

      if (cube.userData.neighboringMineCount === 0) {
        const coords = getNeighbors(cube.position.y, cube.position.x);

        coords.forEach(({ row, column }) => {
          const neighborCube = cubes[row][column];
          if (!neighborCube.userData.active) {
            setActive(neighborCube);
          }
        });
      }
    }

    // event handlers
    // TODO: unregister
    /**
     * sets THREE.Pointer instance to normalized x, y required for raycaster to click the correct cubes
     * @param event
     */
    function onMouseMove(event: MouseEvent) {
      mouse.x = (event.offsetX / width) * 2 - 1;
      mouse.y = -(event.offsetY / height) * 2 + 1;
    }

    /**
     * 1. intial click allows for neighbor counts to be visible on
     */
    function onClick() {
      if (!initialClick) {
        initialClick = true;
      }
      raycaster.setFromCamera(mouse, camera);
      let intersects: THREE.Intersection<
        THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
      >[] = [];
      intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length) {
        let intersectedCube;
        intersects
          // We want to ignore any helpers we have loaded into the scene
          .filter(
            (intersect) =>
              intersect.object.type === "Mesh" &&
              intersect.object.geometry.type === "BoxGeometry",
          )
          .map((intersected, idx) => {
            if (idx === 0) {
              intersectedCube = intersected.object;
            }
          });

        if (intersectedCube) {
          setActive(intersectedCube);
        }
      }
    }

    // event listeners
    if (canvas) {
      canvas.addEventListener("mousemove", onMouseMove, false);
      canvas.addEventListener("click", onClick, false);
    }

    const controls = new OrbitControls(camera, renderer.domElement);

    function render() {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(render);
    }

    render();
  });
</script>

<h2>Minesweeper</h2>
<br />
<canvas id="mineField" />
