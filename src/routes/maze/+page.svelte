<!-- https://threejs.org/examples/#games_fps -->
<!-- https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html -->
<script lang="ts">
  import { onMount } from "svelte";
  import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
  import * as colors from "$lib/colors";
  import * as THREE from "three";

  onMount(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 50);
    camera.position.set(0, 0, 12);
    scene.add(camera);

    window.addEventListener("resize", onWindowResize);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // plane mesh
    const floorPlaneGeometry = new THREE.PlaneGeometry(4,4);
    const floorPlane = new THREE.Mesh(
      floorPlaneGeometry,
      new THREE.MeshBasicMaterial({
        color: colors.white,
        side: THREE.DoubleSide,
      })
    );
    floorPlane.position.set(0, 0, 0);
    scene.add(floorPlane);

    const leftPlaneGeometry = new THREE.PlaneGeometry(2, 8);
    const leftPlane = new THREE.Mesh(
      leftPlaneGeometry,
      new THREE.MeshBasicMaterial({
        color: colors.cornflowerBlue,
        side: THREE.DoubleSide,
      })
    );
    leftPlane.rotation.x = Math.PI / 2;
    leftPlane.position.y = -4;
    leftPlane.position.z = 4;

    scene.add(leftPlane);
    camera.lookAt(leftPlane.position);

    // ambient light
    const ambientLight = new THREE.AmbientLight(colors.white, 0.25);
    scene.add(ambientLight);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("mazeCanvas") ?? undefined,
    });

    const controls = new PointerLockControls(camera, renderer.domElement);
    const clock = new THREE.Clock();
    function animate() {
      renderer.render(scene, camera);
      const elapsedTime = clock.getElapsedTime();
      window.requestAnimationFrame(animate);
    }

    animate();
  });
</script>

<canvas class="maze" id="mazeCanvas" />

<style>
  .maze {
    width: 100vw;
  }
</style>
