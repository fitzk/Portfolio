<script lang="ts">
  import { getCanvasDims } from "$lib/util";
  import { onMount } from "svelte";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import simpleShadow from "$lib/assets/textures/simpleShadow.jpg";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import Example from "$lib/threejs/Example.svelte";
  // @ts-ignore it's a markdown file
  import ExampleMarkdown from "./ZFighting.md";

  onMount(() => {
    THREE.ColorManagement.enabled = false;

    const { width, height } = getCanvasDims();

    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(75, width / height);
    camera.position.z = 8; // move camera in front of cube by moving camera along z access
    camera.position.y = 3;
    camera.position.x = 3;
    scene.add(camera);

    // plane mesh
    const planeGeometry = new THREE.PlaneGeometry(8, 8);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(simpleShadow);
    const material = new THREE.MeshBasicMaterial({
      alphaMap: texture,
      transparent: true,
      color: colors.bitterSweet,
    });
    const sphereShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      material,
    );
    sphereShadow.rotation.x = Math.PI * 1.5;
    scene.add(sphereShadow);

    const basePlane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial(),
    );
    basePlane.rotation.x = Math.PI * 1.5;
    scene.add(basePlane);

    // ambient light
    const ambientLight = new THREE.AmbientLight(colors.white, 0.25);
    scene.add(ambientLight);

    // directional light
    const directionalLight = new THREE.DirectionalLight(colors.bitterSweet, 3);
    directionalLight.position.x = 2;
    directionalLight.position.z = 2;
    // reduce amplitude
    directionalLight.shadow.camera.top = 3;
    scene.add(directionalLight);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("ZFightingCanvas") ?? undefined,
    });
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const controls = new OrbitControls(camera, renderer.domElement);
    const clock = new THREE.Clock();

    function animate() {
      controls.update();
      renderer.render(scene, camera);
      const elapsedTime = clock.getElapsedTime();
      basePlane.rotation.z = elapsedTime;
      window.requestAnimationFrame(animate);
    }

    animate();
  });
</script>

<Example>
  <ExampleMarkdown />
  <canvas id="ZFightingCanvas" slot="live" />
</Example>
