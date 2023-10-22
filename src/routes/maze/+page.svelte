<!-- https://threejs.org/examples/#games_fps -->
<!-- https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html -->
<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import { World } from "@threlte/rapier";
</script>

<div class="canvasWrapper">
  <Canvas>
    <World>
      <Scene />
    </World>
  </Canvas>
</div>

<style>
  .canvasWrapper {
    height: 98vh;
  }
</style>
