<script lang="ts">
  import * as THREE from "three";
  import { onMount } from "svelte";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import * as colors from "$lib/colors";
  import crackedEarth from "$lib/assets/crackedEarth.jpg";

  onMount(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;

    const scene = new THREE.Scene();

    // axis helper
    const axisHelper = new THREE.AxesHelper(4);
    scene.add(axisHelper);

    const house = new THREE.Group();
    scene.add(house);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(crackedEarth);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshBasicMaterial({
        map: texture,
      }),
    );
    house.add(plane);

    const walls = new THREE.Mesh(new THREE.BoxGeometry(2, 2));
    walls.position.z = 0.5;
    house.add(walls);
  
    // camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 100);
    camera.position.z = 8; // move camera in front of cube by moving camera along z access
    camera.position.y = 4;
    scene.add(camera);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("house") ?? undefined,
    });

    renderer.setSize(width, height);

    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }

    animate();
  });
</script>

<canvas id="house" />

references & inspiration 1. https://threejs.org/examples 2.
https://threejs-journey.com
