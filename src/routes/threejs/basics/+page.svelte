<script lang="ts">
  import AnimateCube from "$lib/threejs/basics/AnimateCube.svelte";
  import DebugGUI from "$lib/threejs/basics/DebugGUI.svelte";
  import DrawCube from "$lib/threejs/basics/DrawCube.svelte";
  import Lights from "$lib/threejs/basics/Lights.svelte";
  import ThreeDimensionText from "$lib/threejs/basics/3DText.svelte";
  import TransformCube from "$lib/threejs/basics/TransformCube.svelte";
  import TransformThreeCubes from "$lib/threejs/basics/TransformThreeCubes.svelte";
  import Shadows from "$lib/threejs/basics/Shadows.svelte";
  import ShadowSphere from "$lib/threejs/basics/ShadowsSphere.svelte";
  import ZFighting from "$lib/threejs/basics/ZFighting.svelte";
  import AnchorSVG from "$lib/assets/AnchorSVG.svelte";
  import * as colors from "$lib/colors";

  const examples = [
    "Draw a Cube",
    "Transform Cubes",
    "Animate",
    "Debug GUI",
    "3D Text",
    "Lights",
    "Shadows",
    "Quirks",
  ];
  function handleAnchorClick(
    event: MouseEvent & { currentTarget: HTMLAnchorElement },
  ) {
    event.preventDefault();
    const link = event.currentTarget;
    const anchorId = new URL(link.href).hash.replace("#", "");
    const anchor = document.getElementById(anchorId);
    window.scrollTo({
      top: anchor?.offsetTop,
      behavior: "smooth",
    });
  }

  function scrollToTop(event: MouseEvent) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  let anchorColor = colors.toHex(colors.cornflowerBlue);
  let anchorColorAlt = colors.toHex(colors.black);
  let scrollTopColor = colors.toHex(colors.bitterSweet);
  let scrollTopColorAlt = colors.toHex(colors.black);
</script>

# Threejs
<br />
<div
  class="shortcuts"
  style="--anchor-color:{anchorColor};--anchor-color-alt:{anchorColorAlt}"
>
  {#each examples as example, index}
    <a class="shortcut" href="#anchor-{index}" on:click={handleAnchorClick}>
      <AnchorSVG />
      {example}
    </a>
  {/each}
</div>
<br />

<h2 id="anchor-0">{examples[0]}</h2>
<DrawCube />

<h2 id="anchor-1">{examples[1]}</h2>
<TransformCube />
<TransformThreeCubes />

<h2 id="anchor-2">{examples[2]}</h2>
<AnimateCube />

<h2 id="anchor-3">{examples[3]}</h2>
<DebugGUI />

<h2 id="anchor-4">{examples[4]}</h2>
<ThreeDimensionText />

<h2 id="anchor-5">{examples[5]}</h2>
<Lights />

<h2 id="anchor-6">{examples[6]}</h2>
<Shadows />
<ShadowSphere />

<h2 id="anchor-7">{examples[7]}</h2>
<ZFighting />

<pre>
references & inspiration 
1. https://threejs.org/examples
2. https://threejs-journey.com
</pre>

<button
  class="scroll-top"
  style="--scroll-top-color:{scrollTopColor};--scroll-top-color-alt:{scrollTopColorAlt}"
  on:click={scrollToTop}
>
  top
</button>

<style>
  .scroll-top {
    background-color: var(--scroll-top-color);
    border-radius: 9999px;
    border: none;
    bottom: 50px;
    font-size: 1.2rem;
    font-weight: bold;
    height: 50px;
    padding: 0.5em;
    position: fixed;
    right: 50px;
    width: 50px;
  }

  .scroll-top:hover {
    background-color: var(--scroll-top-color-alt);
    border: 1px solid var(--scroll-top-color);
    color: var(--scroll-top-color);
    cursor: pointer;
  }

  .shortcuts {
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
  }

  .shortcut {
    background-color: var(--anchor-color-alt);
    border-radius: 4px;
    border: 1px solid var(--anchor-color);
    color: var(--anchor-color);
    column-gap: 5px;
    display: flex;
    fill: var(--anchor-color);
    grid-template-columns: 18px auto;
    margin: 0.5em;
    padding: 0.25em;
    text-decoration: none;
    text-wrap: nowrap;
    width: fit-content;
  }

  .shortcut:hover {
    background-color: var(--anchor-color);
    color: var(--anchor-color-alt);
    fill: var(--anchor-color-alt) !important;
    cursor: pointer;
  }
</style>
