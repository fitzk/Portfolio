<div class="example">
  <article>
    <slot />
  </article>
  <div>
    <slot name="live" />
  </div>
</div>

<style>
  .example {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
</style>
