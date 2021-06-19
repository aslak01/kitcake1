<script>
    import { HighlightSvelte } from 'svelte-highlight';
  import github from 'svelte-highlight/src/styles/github'
  // Source: https://github.com/KristerV/pancake-ce/blob/master/site/examples/data/7/App.svelte
  import * as Pancake from '@sveltejs/pancake';
  const sourceData = [10, 2, 4, 9, 14, 12, 5, 8, 9];
  const data = sourceData.map((item, i) => ({ x: i, y: item }));
  const vertMaxVal = Math.max(null, ...sourceData) + 2;
  const barWidth = 0.95; // or use border-left for a more consistent result
  const xAxisTickCount = data.length; // approximate
  const xAxisAdjustment = -0.5;

  const componentCode = `
  // Source: https://github.com/KristerV/pancake-ce/blob/master/site/examples/data/7/App.svelte
  import * as Pancake from '@sveltejs/pancake';
  const sourceData = [10, 2, 4, 9, 14, 12, 5, 8, 9];
  const data = sourceData.map((item, i) => ({ x: i, y: item }));
  const vertMaxVal = Math.max(null, ...sourceData) + 2;
  const barWidth = 0.95; // or use border-left for a more consistent result
  const xAxisTickCount = data.length; // approximate
  const xAxisAdjustment = -0.5;

<div class="center">
  <h1>Column chart</h1>
  <h3>From <a href="https://github.com/KristerV/pancake-ce/blob/master/site/examples/data/7/App.svelte">Pancake CE examples</a></h3>
</div>

<div class="chart">
  <Pancake.Chart x1={xAxisAdjustment} x2={data.length - 1} y1={0} y2={vertMaxVal}>
    <Pancake.Box x1={xAxisAdjustment} x2={data.length + xAxisAdjustment} y2={vertMaxVal}>
      <div class="axes" />
    </Pancake.Box>

    <Pancake.Grid vertical count={xAxisTickCount} let:value>
      <span class="x label">{value}</span>
    </Pancake.Grid>

    <Pancake.Grid horizontal count={3} let:value>
      <span class="y label">{value}</span>
    </Pancake.Grid>

    <Pancake.Columns {data} width={barWidth}>
      <div class="column" />
    </Pancake.Columns>
  </Pancake.Chart>
</div>

  .chart {
    height: 400px;
    width: 100%;
    padding: 3em 2em 2em 3em;
    box-sizing: border-box;
  }
  .axes {
    width: 100%;
    height: 100%;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    opacity: 0.6;
  }
  .label {
    opacity: 0.6;
  }
  .y.label {
    position: absolute;
    left: -2.5rem;
    width: 2rem;
    text-align: right;
    bottom: -0.5em;
  }
  .x.label {
    position: absolute;
    width: 4rem;
    left: -2rem;
    bottom: -2rem;
    font-family: sans-serif;
    text-align: center;
  }
  .column {
    height: 100%;
    background-color: #1f77b4;
  }
`

</script>
<svelte:head>
  {@html github}
</svelte:head>

<div class="center">
  <h1>Column chart</h1>
  <h3>From <a href="https://github.com/KristerV/pancake-ce/blob/master/site/examples/data/7/App.svelte">Pancake CE examples</a></h3>
</div>

<div class="chart">
  <Pancake.Chart x1={xAxisAdjustment} x2={data.length - 1} y1={0} y2={vertMaxVal}>
    <Pancake.Box x1={xAxisAdjustment} x2={data.length + xAxisAdjustment} y2={vertMaxVal}>
      <div class="axes" />
    </Pancake.Box>

    <Pancake.Grid vertical count={xAxisTickCount} let:value>
      <span class="x label">{value}</span>
    </Pancake.Grid>

    <Pancake.Grid horizontal count={3} let:value>
      <span class="y label">{value}</span>
    </Pancake.Grid>

    <Pancake.Columns {data} width={barWidth}>
      <div class="column" />
    </Pancake.Columns>
  </Pancake.Chart>
</div>

<HighlightSvelte {componentCode} />

<style>
  .chart {
    height: 400px;
    width: 100%;
    padding: 3em 2em 2em 3em;
    box-sizing: border-box;
  }
  .axes {
    width: 100%;
    height: 100%;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    opacity: 0.6;
  }
  .label {
    opacity: 0.6;
  }
  .y.label {
    position: absolute;
    left: -2.5rem;
    width: 2rem;
    text-align: right;
    bottom: -0.5em;
  }
  .x.label {
    position: absolute;
    width: 4rem;
    left: -2rem;
    bottom: -2rem;
    font-family: sans-serif;
    text-align: center;
  }
  .column {
    height: 100%;
    background-color: #1f77b4;
  }
</style>


