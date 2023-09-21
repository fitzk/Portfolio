<script lang="ts">
  import * as THREE from "three";
  import { onMount } from "svelte";
  import { drawCube } from "$lib/drawingHelpers";
  import * as colors from "$lib/colors";

  // examples
  function animateCube() {
    const height = window.innerHeight / 2;

    const scene = new THREE.Scene();

    const group = new THREE.Group();
    scene.add(group);

    const cube = drawCube(colors.lightGreen);

    // axis helper
    const axisHelper = new THREE.AxesHelper(4);
    scene.add(axisHelper);

    // camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / height);
    camera.position.z = 3; // move camera in front of cube by moving camera along z access
    scene.add(camera);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("animateCube") ?? undefined,
    });

    renderer.setSize(window.innerWidth, height);
    renderer.render(scene, camera);
  }

  onMount(() => {});
</script>

## Animations
<canvas id="animateCube" />

references & inspiration 1. https://threejs.org/examples 2.
https://threejs-journey.com
