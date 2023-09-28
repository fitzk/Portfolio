<script lang="ts">
  import AnimateCube from "$lib/threejs/basics/AnimateCube.svelte";
  import DebugGUI from "$lib/threejs/basics/DebugGUI.svelte";
  import DrawCube from "$lib/threejs/basics/DrawCube.svelte";
  import Lights from "$lib/threejs/basics/Lights.svelte";
  import ThreeDimensionText from "$lib/threejs/basics/3DText.svelte";
  import TransformCube from "$lib/threejs/basics/TransformCube.svelte";
  import TransformThreeCubes from "$lib/threejs/basics/TransformThreeCubes.svelte";
  import Shadows from "$lib/threejs/basics/Shadows.svelte";
  import ShadowsCont from "$lib/threejs/basics/ShadowsCont.svelte";
</script>

# Threejs Basics

<DrawCube />

## Transform Cubes
<TransformCube />
<TransformThreeCubes />

## Animation
<AnimateCube />

## Debug GUI
<DebugGUI />

## 3D Text
<ThreeDimensionText />

## Lights
<Lights />

## Shadows
<Shadows />
<ShadowsCont />

references & inspiration 1. https://threejs.org/examples 2.
https://threejs-journey.com
