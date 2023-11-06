<script>
  import { base } from "$app/paths";
</script>

<nav>
  <a href="{base}/">home</a>
  <a href="{base}/threejs/examples">concepts</a>
  <a href="{base}/minesweeper">minesweeper</a>
  <a target=”_blank” href="https://github.com/fitzk">github</a>
</nav>

<div id="content">
  <slot />
</div>
