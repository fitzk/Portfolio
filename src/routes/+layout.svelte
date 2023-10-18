<script>
  import { base } from "$app/paths";
</script>

<nav>
  <a href="{base}/">home</a>
  <a href="{base}/threejs/examples">threejs</a>
  <!-- <a href="{base}/threejs/desert">desert</a> -->
  <a href="{base}/minesweeper">minesweeper</a>

  <a target="”_blank”" href="https://github.com/fitzk">github</a>
</nav>

<div id="inProgressBanner">
  <p>Kayla's Portfolio - IN PROGRESS</p>
</div>

<div id="content">
  <slot />
</div>
