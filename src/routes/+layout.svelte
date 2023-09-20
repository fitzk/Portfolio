<script>
    import { base } from "$app/paths";
</script>

<nav>
    <a href={base}>home</a>
    <a href="{base}/threejs/basics"> threejs basics</a>
</nav>

<div id="inProgressBanner">
    <p>Kayla's Portfolio - IN PROGRESS</p>
</div>

<div id='content'>
    <slot />
</div>

<style>
    #content {
        padding: 1.5em;
    }

    #inProgressBanner {
        font-size: 1.2rem;
        margin: 0;
        padding: 1em;
    }

    nav {
        align-items: center;
        background-color: blueviolet;
        display: flex;
        justify-content: flex-end;
        padding: 0.5em;
    }

    nav a {
        color: white;
        font-size: 1.2rem;
        margin-right: 1em;
        text-decoration: none;
    }
</style>
