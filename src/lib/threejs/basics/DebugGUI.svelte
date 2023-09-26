<script lang="ts">
  import Example from "$lib/threejs/Example.svelte";
  import { onMount } from "svelte";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import AnimateCube from "./AnimateCube.svelte";

  onMount(async () => {
    const guiLib = (await import("lil-gui")).default;

    const gui = new guiLib({
      container: document.getElementById("gui") ?? undefined,
      autoPlace: false,
    });

    const height = window.innerHeight / 2;
    const width = window.innerWidth / 2;

    const scene = new THREE.Scene();

    // draw a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: colors.lightGreen,
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
      canvas: document.getElementById("lilgui") ?? undefined,
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
  <span>

I had to dynamically load 'lil-gui' to avoid a self not defined error.  By default the UI will be mounted in the top right corner of the screen.  In order to move the UI next to our canvas, I changed the container to be a sibling of our canvas
    
```ts
const guiLib = (await import("lil-gui")).default;

const gui = new guiLib({
  container: document.getElementById("gui") ?? undefined,
  autoPlace: false,
});

```

Then we draw a box and add properties we want to see in the UI
```ts
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui.add(mesh.position, "y").min(-3).max(3).step(0.01);
gui.add(mesh.position, "x").min(-3).max(3).step(0.01);
gui.add(mesh.position, "z").min(-3).max(3).step(0.01);
```
  </span>
  <span slot="live">
    <div id="gui" />
    <canvas id="lilgui" />
  </span>
</Example>

<style>
  #gui {
    margin-left: 0.25em;
  }
</style>