<script context="module">
    export async function load({ fetch }) {
    const examples = await fetch(`examples.json`)
        .then((r) => r.json());
    return {
      props: { examples }
    };
  }

  // import fs from 'fs';  
  // const modules = import.meta.globEager('./*/index.svelte');
  // console.log(modules)
  // // console.log(process.cwd())
  // export const charts = Object.values(modules).map((mod) => ({ Chart: mod.default }));
  // export const chartCode = Object.keys(modules).map((mod) => ({ ChartCode: fs.readFileSync('./src/routes/examples' + mod.substr(1)) }));
</script>

<script>
  export let examples
  console.log(examples)
  // function nextChart() {
  //   (number + 1) < charts.length ? number += 1 : number = 0
  // }
  // function prevChart() {
  //   (number - 1) > 0 ? number -= 1 : number = charts.length - 1
  // }
  function toggleAll() {
    viewSingle = !viewSingle
  }
  let number = 0
  let viewSingle = true
</script>

<svelte:head>
  <title>Examples</title>
</svelte:head>

<!-- <nav>
  <h2>Browse examples</h2>
  <button on:click="{prevChart}">&larr;</button>
  <button on:click="{nextChart}">&rarr;</button>
  <br>
  <button on:click="{toggleAll}">
    {#if viewSingle}
      View all
    {:else}
      View single
    {/if}
  </button>
</nav>
<section>
  {#if charts !== null}
    {#if viewSingle}
      {#each charts as { Chart }, index}
        {#if number === index && viewSingle}
          <Chart />
        {/if}
      {/each}
    {:else}
      {#each charts as { Chart }}
        <Chart />
      {/each}
    {/if}
  {/if}
</section> -->

<style>
  nav {
    margin: 0 auto;
    width: 200px;
    text-align: center;
  }
</style>