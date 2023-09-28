<script lang="ts">
  import { getCanvasDims } from "$lib/util";
  import { onMount } from "svelte";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import Example from "$lib/threejs/Example.svelte";
  // @ts-ignore it's a markdown file
  import ExampleMarkdown from "./ShadowsCont.md";
  import simpleShadow from "$lib/assets/textures/simpleShadow.jpg";

  onMount(async () => {
    const guiLib = (await import("lil-gui")).default;

    const gui = new guiLib({
      container: document.getElementById("shadowsContGUI") ?? undefined,
      autoPlace: false,
      closeFolders: true,
    });

    THREE.ColorManagement.enabled = false;

    const { width, height } = getCanvasDims();

    const scene = new THREE.Scene();

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1),
      new THREE.MeshStandardMaterial(),
    );
    sphere.position.y = 1;
    scene.add(sphere);

    // axis helper
    const axisHelper = new THREE.AxesHelper(4);
    scene.add(axisHelper);

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
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), material);
    plane.rotation.x = Math.PI * 1.5;
    plane.position.z = 0.5;
    scene.add(plane);

    const basePlane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial(),
    );
    basePlane.position.z = -0.5;
    basePlane.rotation.x = Math.PI * 1.5;
    scene.add(basePlane);

    // ambient light
    const ambientLight = new THREE.AmbientLight(colors.white, 0.25);
    scene.add(ambientLight);
    // ambient light gui
    const ambientLightFolder = gui.addFolder("Ambient Light");
    ambientLightFolder.addColor(ambientLight, "color");
    ambientLightFolder.add(ambientLight, "intensity").min(0).max(5).step(1);

    // directional light
    const directionalLight = new THREE.DirectionalLight(colors.bitterSweet, 3);
    directionalLight.position.x = 2;
    directionalLight.position.z = 2;

    // reduce amplitude
    directionalLight.shadow.camera.top = 3;
    scene.add(directionalLight);
    // directional light gui
    const directionalLightFolder = gui.addFolder("Directional Light");
    directionalLightFolder.addColor(directionalLight, "color");
    directionalLightFolder
      .add(directionalLight, "intensity")
      .min(0)
      .max(5)
      .step(1);
    directionalLightFolder
      .add(directionalLight.position, "x")
      .min(-5)
      .max(5)
      .step(1);
    directionalLightFolder
      .add(directionalLight.position, "y")
      .min(-5)
      .max(5)
      .step(1);
    directionalLightFolder
      .add(directionalLight.position, "z")
      .min(-5)
      .max(5)
      .step(1);

    const directionalLightCameraHelper = new THREE.CameraHelper(
      directionalLight.shadow.camera,
    );
    scene.add(directionalLightCameraHelper);
    directionalLightCameraHelper.visible = false;

    // spot light
    const spotLight = new THREE.SpotLight(
      colors.spaceCadet,
      50, // intensity
      5, // distance
      Math.PI * 0.3, // angle
    );
    spotLight.position.set(0, 1, 2);
    scene.add(spotLight);
    scene.add(spotLight.target);
    // helper
    const spotLightCameraHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLightCameraHelper);
    spotLightCameraHelper.visible = false;
    // spot light gui
    const spotLightFolder = gui.addFolder("Spot Light");
    spotLightFolder.add(spotLight, "intensity").min(0).max(1000).step(1);
    spotLightFolder.add(spotLight, "distance").min(0).max(5).step(0.1);
    spotLightFolder.add(spotLight, "penumbra").min(0).max(1).step(0.01);
    spotLightFolder.add(spotLight, "decay").min(0).max(100).step(1);
    spotLightFolder.add(spotLight, "angle").min(0).max(360).step(1);
    spotLightFolder.add(spotLight.position, "x").min(-5).max(5).step(1);
    spotLightFolder.add(spotLight.position, "y").min(-5).max(5).step(1);
    spotLightFolder.add(spotLight.position, "z").min(-5).max(5).step(1);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("shadowsCont") ?? undefined,
    });
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }

    animate();
  });
</script>

<Example>
  <ExampleMarkdown />
  <span slot="live">
    <div id="shadowsContGUI" />
    <canvas id="shadowsCont" />
  </span>
</Example>

<style>
  #shadowsContGUI {
    margin-left: 1em;
  }
</style>
