<script lang="ts">
  import * as THREE from "three";
  import { onMount } from "svelte";
  import { drawCube } from "$lib/drawingHelpers";
  import * as colors from "$lib/colors";

  // examples
  function examplesAnimateCube() {
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
    renderer.render(scene, camera);

    const clock = new THREE.Clock();

    function animate() {
      const elapsedTime = clock.getElapsedTime();
      cube.rotation.y = elapsedTime;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }

    animate();
  }

  onMount(() => {
    examplesAnimateCube();
  });
</script>

## Animation
Ensure animation is the same speed regardless of viewer's computer FPS

## Animate Single Cube
```js
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  cube.rotation.y = elapsedTime;
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

animate();
```
<canvas id="animateCube" />

references & inspiration 
1. https://threejs.org/examples
2. https://threejs-journey.com
