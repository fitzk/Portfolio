<script lang="ts">
  import { Font } from "three/examples/jsm/loaders/FontLoader";
  import { getCanvasDims } from "$lib/util";
  import { onMount } from "svelte";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
  import * as colors from "$lib/colors";
  import * as THREE from "three";
  import Example from "$lib/threejs/Example.svelte";
  // @ts-ignore it's a markdown file
  import ExampleMarkdown from "./3DText.md";
  import matcap from "$lib/assets/textures/matcap.png";
  import typeface from "$lib/assets/Yellowtail_Regular.json";

  onMount(() => {
    const { width, height } = getCanvasDims();

    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(50, width / height);
    camera.position.z = 5; // move camera in front of cube by moving camera along z access
    camera.position.y = -2;
    scene.add(camera);

    // light
    const ambientLight = new THREE.AmbientLight(colors.mustard, 1);
    scene.add(ambientLight);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("3DTextCanvas") ?? undefined,
    });

    renderer.setSize(width, height);

    const textGeometry = new TextGeometry("Kayla's Portfolio", {
      bevelEnabled: true,
      bevelOffset: 0,
      bevelSegments: 4,
      bevelSize: 0.04,
      bevelThickness: 0.04,
      curveSegments: 24,
      font: new Font(typeface),
      height: 0.3, // extrusion depth
      size: 0.8,
    });
    textGeometry.center();

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(matcap);
    const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: texture,
    });
    const mesh = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(mesh);

    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
      renderer.render(scene, camera);
      controls.update();
      window.requestAnimationFrame(animate);
    }

    animate();
  });
</script>

<Example>
  <ExampleMarkdown />
  <canvas id="3DTextCanvas" slot="live" />
</Example>
