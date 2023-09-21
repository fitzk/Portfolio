<script lang="ts">
    import * as THREE from "three";
    import { onMount } from "svelte";
    import { drawCube } from '$lib/drawingHelpers'

    // examples
    function staticRedCube() {
        const height = window.innerHeight/2;
        
        const scene = new THREE.Scene();

        // red cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / height
        );
        camera.position.z = 3; // move camera in front of cube by moving camera along z access
        scene.add(camera);

        // renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("basicsStaticRedCube") ?? undefined,
        });

        renderer.setSize(window.innerWidth, height);
        renderer.render(scene, camera);
    }

    function transformRedCube() {
        const height = window.innerHeight/2;
        
        const scene = new THREE.Scene();

        // red cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(2, 1, 0);
        mesh.scale.set(1, 0.5, 0.5);

        mesh.rotation.reorder('YXZ'); // reorder before rotation to avoid axis lock / confusion
        mesh.rotation.y = Math.PI; // half rotation on y axis
        mesh.rotation.x = Math.PI; 
        scene.add(mesh);

        // axis helper
        const axisHelper = new THREE.AxesHelper(4);
        scene.add(axisHelper);

        // camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / height
        );
        camera.position.z = 3; // move camera in front of cube by moving camera along z access
        camera.lookAt(mesh.position);
        scene.add(camera);

        // renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("basicsTransformRedCube") ?? undefined,
        });

        renderer.setSize(window.innerWidth, height);
        renderer.render(scene, camera);
    }

    function transformThreeCubes() {
        const height = window.innerHeight/2;
        
        const scene = new THREE.Scene();

        const group = new THREE.Group();
        scene.add(group);

        const firstCube = drawCube();
        const secondCube = drawCube();
        const thirdCube = drawCube()

        secondCube.position.x = -2;
        thirdCube.position.x = 2;

        group.add(firstCube);
        group.add(secondCube);
        group.add(thirdCube);
        group.rotation.y = 1;

        // axis helper
        const axisHelper = new THREE.AxesHelper(4);
        scene.add(axisHelper);

        // camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / height
        );
        camera.position.z = 3; // move camera in front of cube by moving camera along z access
        scene.add(camera);

        // renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("basicsTransformThreeCubes") ?? undefined,
        });

        renderer.setSize(window.innerWidth, height);
        renderer.render(scene, camera);
    }

    onMount(() => {
        staticRedCube();
        transformRedCube();
        transformThreeCubes();
    });
</script>

## Static Red Cube


```html
    <canvas id="basicsStaticRedCube" />
```

```js

    const scene = new THREE.Scene();

    // red cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
    camera.position.z = 3; // move camera in front of cube by moving camera along z access
    scene.add(camera);

    // renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("basicsStaticRedCube") ?? undefined,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

```
<canvas id="basicsStaticRedCube" />

---
## Transform Cubes

### Rotate & reposition red cube
```js
    // red cube (same as prev example)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(2, 1, 0);
    mesh.scale.set(1, 0.5, 0.5);
    mesh.rotation.reorder('YXZ'); // reorder before rotation to avoid axis lock / confusion
    mesh.rotation.y = Math.PI; // half rotation on y axis
    mesh.rotation.x = Math.PI; 
    scene.add(mesh);

    // axis helper
    const axisHelper = new THREE.AxesHelper(4);
    scene.add(axisHelper);
```
<canvas id="basicsTransformRedCube" />

### Group three cubes & rotate group on y axis
```js

// helper - draws a colored cube
function drawCube() {
    const color = new THREE.Color( 0xffffff );
    color.setHex( Math.random() * 0xffffff );
    return new THREE.Mesh(
        new THREE.BoxGeometry( 1, 1, 1 ),
        new THREE.MeshBasicMaterial({
            color
        })
    )
}

// transformations
const group = new THREE.Group();
scene.add(group);

const firstCube = drawCube();
const secondCube = drawCube();
const thirdCube = drawCube()

// move two of the cubes out of the 
// center of the canvas so they do 
// not overlap
secondCube.position.x = -2; 
thirdCube.position.x = 2;

group.add(firstCube);
group.add(secondCube);
group.add(thirdCube);
group.rotation.y = 1; // rotate group on y axis
```

<canvas id="basicsTransformThreeCubes" />

references & inspiration
1. https://threejs.org/examples
2. https://threejs-journey.com