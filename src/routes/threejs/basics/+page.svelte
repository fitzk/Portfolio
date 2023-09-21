<script lang="ts">
    import * as THREE from "three";
    import { onMount } from "svelte";
    import { drawCube } from '$lib/drawingHelpers';
    import * as colors from '$lib/colors';

    // examples
    function examplesBasicsDrawCube() {
        // window is only available in onMount fn
        const height = window.innerHeight/2;
        const width = window.innerWidth/2;

        const scene = new THREE.Scene();

        // draw a cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: colors.lightGreen });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // camera
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height
        );
        camera.position.z = 4; // move camera in front of cube by moving camera along z access
        scene.add(camera);

        // renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("basicsDrawCube") ?? undefined,
        });

        renderer.setSize(width, height);
        renderer.render(scene, camera);
    }

    function examplesBasicsTransformCube() {
        const height = window.innerHeight/2;
        const width = window.innerWidth/2;
        
        const scene = new THREE.Scene();

        // draw a cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: colors.lightGreen });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(2, 1, 0);
        mesh.scale.set(1, 0.5, 0.5);
        // reorder before rotation to avoid axis lock / confusion
        mesh.rotation.reorder('YXZ'); 
        // Math.PI = half rotation on y axis
        mesh.rotation.y = Math.PI; 
        mesh.rotation.x = Math.PI; 
        scene.add(mesh);

        // axis helper
        const axisHelper = new THREE.AxesHelper(4);
        scene.add(axisHelper);

        // camera
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height
        );
        camera.position.z = 4; // move camera in front of cube by moving camera along z access
        camera.lookAt(mesh.position);
        scene.add(camera);

        // renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("basicsTransformCube") ?? undefined,
        });

        renderer.setSize(width, height);
        renderer.render(scene, camera);
    }

    function examplesBasicsTransformThreeCubes() {
        const height = window.innerHeight/2;
        const width = window.innerWidth/2;

        const scene = new THREE.Scene();

        const group = new THREE.Group();
        scene.add(group);

        const firstCube = drawCube(colors.jordyBlue);
        const secondCube = drawCube(colors.lightGreen);
        const thirdCube = drawCube(colors.tropicalIndigo)
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
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height
        );
        camera.position.z = 4; // move camera in front of cube by moving camera along z access
        scene.add(camera);

        // renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("basicsTransformThreeCubes") ?? undefined,
        });

        renderer.setSize(width, height);
        renderer.render(scene, camera);
    }

    onMount(() => {
        examplesBasicsDrawCube();
        examplesBasicsTransformCube();
        examplesBasicsTransformThreeCubes();
    });
</script>

## Draw a Cube
<div class='example'>
<span>
<!-- \n after comment required for markdown parsing -->

html
```html
<!-- create canvas element -->
<canvas id="basicsDrawCube" />
```

javascript
```js
// javascript
const scene = new THREE.Scene();

// draw a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x8CD790 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// camera
const camera = new THREE.PerspectiveCamera(75, width / height);
// move camera in front of cube by moving camera along z access
camera.position.z = 4; 
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("basicsDrawCube") ?? undefined,
});
renderer.setSize(width, height);
renderer.render(scene, camera);
```
</span>
<canvas id="basicsDrawCube" />
</div>

## Transform Cubes
Axis helper also shown in example

### Rotate & Reposition Single Cube
<div class='example'>
<span>
<!-- \n after comment required for markdown parsing -->

```js
// draw single cube (same as prev example)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.Me dshBasicMaterial({ color: 0x8CD790 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(2, 1, 0);
mesh.scale.set(1, 0.5, 0.5);
// reorder before rotation to avoid axis lock / confusion
mesh.rotation.reorder('YXZ'); 
// Math.PI = half rotation on y axis
mesh.rotation.y = Math.PI;
mesh.rotation.x = Math.PI; 
scene.add(mesh);

// axis helper
const axisHelper = new THREE.AxesHelper(4);
scene.add(axisHelper);
```
</span>
<canvas id="basicsTransformCube" />
</div>

### Group Three Cubes & Rotate on y Axis
Draw three cubes, this example uses a helper function refer to previous examples for how to draw a cube 
<div class='example'>
<!-- \n after comment required for markdown parsing -->

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

<canvas id="basicsTransformThreeCubes" />
</div>

references & inspiration
1. https://threejs.org/examples
2. https://threejs-journey.com