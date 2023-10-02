<script lang="ts">
  import { getCanvasDims } from "$lib/util";
  import { drawCube } from "$lib/util";
  import { onMount } from "svelte";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import Example from "$lib/threejs/Example.svelte";
  // @ts-ignore it's a markdown file
  import ExampleMarkdown from "./AnimateCube.md";

  onMount(() => {
    const { width, height } = getCanvasDims();

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
      canvas: document.getElementById("animateCubeCanvas") ?? undefined,
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

<Example>
  <ExampleMarkdown />
  <canvas id="animateCubeCanvas" slot="live" />
</Example>
