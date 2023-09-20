<script lang="ts">
    import * as THREE from "three";
    import { onMount } from "svelte";

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

    onMount(() => {
        staticRedCube();
    });
</script>

## Static Red Cube

<canvas id="basicsStaticRedCube" />

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

---
## Transform Red Cube

<canvas id="basicsTransformObjects" />

```
```