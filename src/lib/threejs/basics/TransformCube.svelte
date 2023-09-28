<script lang="ts">
  import { getCanvasDims } from "$lib/util";
  import { onMount } from "svelte";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import Example from "$lib/threejs/Example.svelte";
  // @ts-ignore it's markdown
  import ExampleMarkdown from "./TransformCube.md";

  onMount(() => {
    const { width, height } = getCanvasDims();

    const scene = new THREE.Scene();

    // draw a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: colors.lightGreen });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(2, 1, 0);
    mesh.scale.set(1, 0.5, 0.5);
    // reorder before rotation to avoid axis lock / confusion
    mesh.rotation.reorder("YXZ");
    // Math.PI = half rotation on y axis
    mesh.rotation.y = Math.PI;
    mesh.rotation.x = Math.PI;
    scene.add(mesh);

    // axis helper
    const axisHelper = new THREE.AxesHelper(4);
    scene.add(axisHelper);

    // camera
    const camera = new THREE.PerspectiveCamera(75, width / height);
    camera.position.z = 4; // move camera in front of cube by moving camera along z access
    camera.lookAt(mesh.position);
    scene.add(camera);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("transformCube") ?? undefined,
    });

    renderer.setSize(width, height);
    renderer.render(scene, camera);
  });
</script>

### Rotate & Reposition Single Cube

<Example>
  <ExampleMarkdown />
  <canvas id="transformCube" slot="live" />
</Example>
