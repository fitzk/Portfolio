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
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
  }

  .example > article {
    grid-column: 1;
    grid-row: 1;
    overflow-x: scroll;
  }

  .example > div {
    grid-column: 2;
    grid-row: 1;
  }

  /* stack on small screens */
  @media only screen and (max-width: 1000px) {
    .example > article {
      grid-column: 1;
      grid-row: 1;
    }

    .example > div {
      grid-column: 1;
      grid-row: 2;
    }
  }
</style>
