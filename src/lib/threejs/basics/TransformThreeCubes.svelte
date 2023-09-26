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

    const group = new THREE.Group();
    scene.add(group);

    const firstCube = drawCube(colors.jordyBlue);
    const secondCube = drawCube(colors.lightGreen);
    const thirdCube = drawCube(colors.tropicalIndigo);
    secondCube.position.x = -2;
    thirdCube.position.x = 2;

    group.add(firstCube);
    group.add(secondCube);
    group.add(thirdCube);
    group.rotation.y = 1;

    // axis helper
    const axisHelper = new THREE.AxesHelper(5);
    scene.add(axisHelper);

    // camera
    const camera = new THREE.PerspectiveCamera(75, width / height);
    camera.position.z = 4; // move camera in front of cube by moving camera along z access
    scene.add(camera);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("transformThreeCubes") ?? undefined,
    });

    renderer.setSize(width, height);
    renderer.render(scene, camera);
  });
</script>

### Group Three Cubes & Rotate on y Axis 
This example uses a helper function to draw cubes refer to previous examples for how to draw a cube
<Example>

```js
// transformations
const group = new THREE.Group();
scene.add(group);

const firstCube = drawCube(0x98B9F2);
const secondCube = drawCube(0x8CD790);
const thirdCube = drawCube(0x918EF4);

// move two of the cubes so they do not overlap
secondCube.position.x = -2; 
thirdCube.position.x = 2;

group.add(firstCube);
group.add(secondCube);
group.add(thirdCube);
group.rotation.y = 1; // rotate group on y axis
```
  <canvas id="transformThreeCubes" slot="live" />
</Example>
