<script>
  import { base } from "$app/paths";
  import * as colors from "$lib/colors";
</script>

<div>
  <nav style="background-color:{colors.toHex(colors.black)}">
    <a href="{base}/">home</a>
    <a href="{base}/threejs/basics"> threejs basics</a>
    <!-- <a href="{base}/threejs/animation"> threejs animation</a> -->
  </nav>
</div>
<div id="inProgressBanner">
  <p>Kayla's Portfolio - IN PROGRESS</p>
</div>

<div id="content">
  <slot />
</div>

<style global>
  #content {
    padding: 1em;
  }

  #inProgressBanner {
    margin: 0;
    padding: 1em;
  }

  nav {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    padding: 2em;
  }

  nav a {
    color: white;
    text-decoration: none;
    margin-right: 1em;
    text-decoration: none;
    flex-grow: 0;
  }
</style>
