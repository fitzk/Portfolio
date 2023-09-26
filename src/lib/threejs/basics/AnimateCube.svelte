<script lang="ts">
  import { drawCube } from "$lib/drawingHelpers";
  import { onMount } from "svelte";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import Example from "$lib/threejs/Example.svelte";

  onMount(() => {
    const height = window.innerHeight / 2;
    const width = window.innerWidth / 2;

    const scene = new THREE.Scene();

    const cube = drawCube(colors.lightGreen);
    scene.add(cube);

    // axis helper
    const axisHelper = new THREE.AxesHelper(4);
    scene.add(axisHelper);

    // camera
    const camera = new THREE.PerspectiveCamera(75, width / height);
    camera.position.z = 4; // move camera in front of cube by moving camera along z access
    scene.add(camera);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("animateCube") ?? undefined,
    });
    renderer.setSize(width, height);

    const clock = new THREE.Clock();

    function animate() {
      const elapsedTime = clock.getElapsedTime();
      cube.rotation.y = elapsedTime;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }

    animate();
  });
</script>


Ensure animation is the same speed regardless of viewer's computer FPS

<Example>

```ts
const clock = new THREE.Clock();

const elapsedTime = clock.getElapsedTime();
cube.rotation.y = elapsedTime;
renderer.render(scene, camera);
window.requestAnimationFrame(animate);

```
  <canvas id="animateCube" slot="live"></canvas>
</Example>