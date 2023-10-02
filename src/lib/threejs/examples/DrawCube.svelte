<!-- @ts-check -->
<script lang="ts">
  import { onMount } from "svelte";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import Example from "$lib/threejs/Example.svelte";
  // @ts-ignore it's a markdown file
  import ExampleMarkdown from "./DrawCube.md";
  import { getCanvasDims } from "$lib/util";

  onMount(() => {
    const { width, height } = getCanvasDims();
    const scene = new THREE.Scene();

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
      canvas: document.getElementById("drawCubeCanvas") ?? undefined,
    });

    renderer.setSize(width, height);
    renderer.render(scene, camera);
  });
</script>

<Example>
  <ExampleMarkdown />
  <canvas id="drawCubeCanvas" slot="live" />
</Example>
