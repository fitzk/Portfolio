<script lang="ts">
    import * as THREE from "three";
    import { onMount } from "svelte";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

    onMount(() => {
        const canvas = document.getElementById("mainCanvas");

        const renderer = new THREE.WebGLRenderer({
            canvas,
        });

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.setZ(30);

        const geometry = new THREE.SphereGeometry(10, 64, 64);
        const material = new THREE.MeshBasicMaterial({
            color: 0xe6dcb2,
            // wireframe: true,
        });

        const white = 0xffffff;

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        const ambientLight = new THREE.AmbientLight(0xffffff);

        const gridHelper = new THREE.GridHelper(200, 50);

        scene.add(ambientLight);
        scene.add(gridHelper);

        const controls = new OrbitControls(camera, renderer.domElement);

        function addStar() {
            const geometry = new THREE.SphereGeometry(0.15, 10, 10);
            const material = new THREE.MeshStandardMaterial({ color: white });
            const star = new THREE.Mesh(geometry, material);
            const [x, y, z] = Array(3)
                .fill(0)
                .map(() => THREE.MathUtils.randFloatSpread(100));

            star.position.set(x, y, z);
            scene.add(star);
        }

        Array(300).fill(0).forEach(addStar);

        function animate() {
            requestAnimationFrame(animate);

            // slowly rotate sphere
            sphere.rotation.x += 0.0005;
            // sphere.rotation.y += 0.01;
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    });
</script>

<canvas id="mainCanvas" />

<style>
    #mainCanvas {
        position: fixed;
    }
</style>
