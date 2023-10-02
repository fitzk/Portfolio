<script lang="ts">
  import { getCanvasDims } from "$lib/util";
  import { onMount } from "svelte";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import Example from "$lib/threejs/Example.svelte";
  // @ts-ignore it's a markdown file
  import ExampleMarkdown from "./ShadowsSphere.md";
  import simpleShadow from "$lib/assets/textures/simpleShadow.jpg";

  onMount(() => {
    THREE.ColorManagement.enabled = false;

    const { width, height } = getCanvasDims();

    const scene = new THREE.Scene();

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1),
      new THREE.MeshStandardMaterial(),
    );
    scene.add(sphere);

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
      color: colors.black,
    });
    const sphereShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      material,
    );
    sphereShadow.rotation.x = Math.PI * 1.5;
    sphereShadow.position.z = 0.5;
    sphereShadow.position.y = -0.5;
    scene.add(sphereShadow);

    const basePlane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial(),
    );
    basePlane.position.y = -1;
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
      canvas: document.getElementById("shadowsSphere") ?? undefined,
    });
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;
    renderer.setSize(width, height);

    const controls = new OrbitControls(camera, renderer.domElement);
    const clock = new THREE.Clock();

    function animate() {
      controls.update();
      renderer.render(scene, camera);
      const elapsedTime = clock.getElapsedTime();

      // Update the sphere
      sphere.position.x = Math.cos(elapsedTime) * 1.5;
      sphere.position.z = Math.sin(elapsedTime) * 1.5;
      sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

      // Update the shadow
      sphereShadow.position.x = sphere.position.x;
      sphereShadow.position.z = sphere.position.z;
      sphereShadow.material.opacity = (1 - sphere.position.y) * 0.4;

      window.requestAnimationFrame(animate);
    }

    animate();
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  });
</script>

<Example>
  <ExampleMarkdown />
  <span slot="live">
    <div id="shadowsSphereGUI" />
    <canvas id="shadowsSphere" />
  </span>
</Example>
