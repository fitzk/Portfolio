<script lang="ts">
  import { getCanvasDims } from "$lib/util";
  import { onMount } from "svelte";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import Example from "$lib/threejs/Example.svelte";
  // @ts-ignore it's a markdown file
  import ExampleMarkdown from "./Lights.md";

  onMount(async () => {
    const guiLib = (await import("lil-gui")).default;

    const gui = new guiLib({
      container: document.getElementById("lightsGUI") ?? undefined,
      autoPlace: false,
      closeFolders: true,
    });

    THREE.ColorManagement.enabled = false;

    const { width, height } = getCanvasDims();

    const scene = new THREE.Scene();

    // shared material
    const material = new THREE.MeshStandardMaterial();
    material.roughness = 1;

    const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
    cube.position.y = 1.5;
    scene.add(cube);

    // axis helper
    const axisHelper = new THREE.AxesHelper(4);
    scene.add(axisHelper);

    // camera
    const camera = new THREE.PerspectiveCamera(75, width / height);
    camera.position.z = 6; // move camera in front of cube by moving camera along z access
    camera.position.y = 3;
    scene.add(camera);

    // plane mesh
    const planeGeometry = new THREE.PlaneGeometry(8, 8);
    const plane = new THREE.Mesh(planeGeometry, material);
    plane.rotation.x = Math.PI * 1.5;
    scene.add(plane);

    // LIGHTS START

    // ambient light
    const ambientLight = new THREE.AmbientLight(colors.mustard, 0);
    scene.add(ambientLight);
    // ambient light gui
    const ambientLightFolder = gui.addFolder("Ambient Light");
    ambientLightFolder.addColor(ambientLight, "color");
    ambientLightFolder.add(ambientLight, "intensity").min(0).max(5).step(1);

    // directional light
    const directionalLight = new THREE.DirectionalLight(colors.jordyBlue, 0);
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

    // hemisphere light
    const hemisphereLight = new THREE.HemisphereLight(
      colors.cornflowerBlue,
      colors.lightGreen,
      0,
    );
    scene.add(hemisphereLight);
    // hemisphere light gui
    const hemisphereLightFolder = gui.addFolder("Hemisphere Light");
    hemisphereLightFolder.addColor(hemisphereLight, "color").name("skyColor");
    hemisphereLightFolder.addColor(hemisphereLight, "groundColor");
    hemisphereLightFolder
      .add(hemisphereLight, "intensity")
      .min(0)
      .max(5)
      .step(1);

    // point light
    const pointLight = new THREE.PointLight(colors.mustard, 0, 5, 3);
    pointLight.position.set(0, 3, 0);
    scene.add(pointLight);
    // point light gui
    const pointLightFolder = gui.addFolder("Point Light");
    pointLightFolder.addColor(pointLight, "color");
    pointLightFolder.add(pointLight, "intensity").min(0).max(1000).step(1);
    pointLightFolder.add(pointLight.position, "x").min(-5).max(5).step(1);
    pointLightFolder.add(pointLight.position, "y").min(-5).max(5).step(1);
    pointLightFolder.add(pointLight.position, "z").min(-5).max(5).step(1);
    pointLightFolder.add(pointLight, "decay").min(0).max(5).step(1);

    // rect area light, only works with MeshStandardMaterial or MeshPhysicalMaterial
    const rectAreaLight = new THREE.RectAreaLight(
      colors.tropicalIndigo,
      0,
      2,
      2,
    );
    // rectAreaLight.position.x = 2;
    // rectAreaLight.lookAt(new THREE.Vector3())
    scene.add(rectAreaLight);
    // rect area light gui
    const rectAreaLightFolder = gui.addFolder("Rect Area Light");
    rectAreaLightFolder
      .add(rectAreaLight, "intensity")
      .min(0)
      .max(1000)
      .step(1);
    rectAreaLightFolder.add(rectAreaLight, "height").min(1).max(5).step(1);
    rectAreaLightFolder.add(rectAreaLight, "width").min(1).max(5).step(1);
    rectAreaLightFolder.add(rectAreaLight.position, "x").min(-5).max(5).step(1);
    rectAreaLightFolder.add(rectAreaLight.position, "y").min(-5).max(5).step(1);
    rectAreaLightFolder.add(rectAreaLight.position, "z").min(-5).max(5).step(1);

    // spot light
    const spotLight = new THREE.SpotLight(
      colors.white,
      0, // intensity
      10, // distance
      Math.PI * 0.1, // angle
      0.25, // prenumbra
      1, // decay
    );
    spotLight.position.set(1, 1, -1);
    scene.add(spotLight);
    scene.add(spotLight.target);
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
    // LIGHTS END

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("lights") ?? undefined,
    });
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
    <div id="lightsGUI" />
    <canvas id="lights" />
  </span>
</Example>

<style>
  #lightsGUI {
    margin-left: 1em;
  }
</style>
