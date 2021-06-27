<script context="module">
  const modules = import.meta.globEager('./*/index.svelte');
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const url = `api/coinbase-pro/ETH-USD.json?granularity=900`;
    const res = await fetch(url);
    const cryptoData = await res.json();

    if (res.ok) {
      return {
        props: {
          cryptoData
        }
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    };
  }
  export const charts = Object.values(modules).map((mod) => ({ Chart: mod.default }));
</script>

<script>
  export let cryptoData;
  function nextChart() {
    number + 1 < charts.length ? (number += 1) : (number = 0);
  }
  function prevChart() {
    number - 1 >= 0 ? (number -= 1) : (number = charts.length - 1);
  }
  let number;
  $: number = 0;
</script>

<svelte:head>
  <title>Examples</title>
</svelte:head>

<nav>
  <h2>Browse examples</h2>
  <button on:click={prevChart}>&larr;</button>
  <button on:click={nextChart}>&rarr;</button>
</nav>
<section>
  {#if charts !== null}
    {#each charts as { Chart }, index}
      {#if number === index}
        <Chart {cryptoData} />
      {/if}
    {/each}
  {/if}
</section>

<style>
  nav {
    margin: 0 auto;
    width: 200px;
    text-align: center;
  }
</style>
