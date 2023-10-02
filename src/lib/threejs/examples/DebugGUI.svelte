<script lang="ts">
  import { getCanvasDims } from "$lib/util";
  import { onMount } from "svelte";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import Example from "$lib/threejs/Example.svelte";
  // @ts-ignore it's a markdown file
  import ExampleMarkdown from "./DebugGUI.md";

  onMount(async () => {
    const guiLib = (await import("lil-gui")).default;

    const gui = new guiLib({
      container: document.getElementById("gui") ?? undefined,
      autoPlace: false,
    });

    const { width, height } = getCanvasDims();

    const scene = new THREE.Scene();

    // draw a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: colors.greenBlue,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    gui.add(mesh.position, "y").min(-3).max(3).step(0.01);
    gui.add(mesh.position, "x").min(-3).max(3).step(0.01);
    gui.add(mesh.position, "z").min(-3).max(3).step(0.01);

    // camera
    const camera = new THREE.PerspectiveCamera(75, width / height);
    camera.position.z = 4; // move camera in front of cube by moving camera along z access
    scene.add(camera);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("lilguiCanvas") ?? undefined,
    });
    renderer.setSize(width, height);

    function animate() {
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }

    animate();
  });
</script>

On page control panel. We are using [lil-gui](https://lil-gui.georgealways.com)
for this example.

<Example>
  <ExampleMarkdown />
  <span slot="live">
    <div id="gui" />
    <canvas id="lilguiCanvas" />
  </span>
</Example>

<style>
  #gui {
    margin-left: 1em;
  }
</style>
