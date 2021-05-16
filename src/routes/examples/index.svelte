<script context="module">
  const modules = import.meta.globEager('./*/index.svelte');
  export const charts = Object.values(modules).map((mod) => ({ Chart: mod.default }));
</script>

<svelte:head>
  <title>Examples</title>
</svelte:head>

<section>
  {#if charts !== null}
    {#each charts as { Chart }}
      <Chart />
    {/each}
  {/if}
</section>
