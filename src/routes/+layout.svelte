<script>
  import { base } from "$app/paths";
  import * as colors from "$lib/colors";
</script>

<div>
  <nav style="background-color:{colors.toHex(colors.black)}">
    <a href="{base}/">home</a>
    <a href="{base}/threejs/basics"> threejs basics</a>
    <a href="{base}/threejs/animation"> threejs animation</a>
  </nav>
</div>
<div id="inProgressBanner">
  <p>Kayla's Portfolio - IN PROGRESS</p>
</div>

<div id="content">
  <slot />
</div>
