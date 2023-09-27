<!-- @ts-check -->
<script lang="ts">
  import { onMount } from "svelte";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import Example from "$lib/threejs/Example.svelte";
  // @ts-ignore it's a markdown file
  import ExampleMarkdown from "./DrawCube.md";

  onMount(() => {
    // window is only available in onMount fn
    const height = window.innerHeight / 2;
    const width = window.innerWidth / 2;

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
      canvas: document.getElementById("drawCube") ?? undefined,
    });

    renderer.setSize(width, height);
    renderer.render(scene, camera);
  });
</script>

## Draw a Cube

<Example>
  <ExampleMarkdown />
  <canvas id="drawCube" slot="live" />
</Example>
