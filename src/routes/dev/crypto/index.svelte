<script>
  import * as Pancake from '@sveltejs/pancake';
  import * as yootils from 'yootils';
  import { tooltip } from '$lib/crypto/tooltip';
  import dayjs from 'dayjs';
  import { Ema } from '$lib/crypto/utils';
  export let cryptoData;
  let tradingPair = `ETH-USD`;
  const candleGranularity = [
    { label: `1 Min`, value: 60 },
    { label: `5 Min`, value: 300 },
    { label: `15 Min`, value: 900 },
    { label: `1 Hour`, value: 3600 },
    { label: `6 Hours`, value: 21600 },
    { label: `1 Day`, value: 86400 }
  ];
  let w;
  let ema12Enabled = false;
  let ema26Enabled = false;
  //const emaList = [];
  let tempGranularity = 900;
  let granularity = 900;
  let { data, pairs } = cryptoData;

  const determineColor = (i) => {
    if (i == 0) {
      return '#22c55e';
    } else if (testData[i - 1].close > testData[i - 1].open) {
      return '#22c55e';
    } else if (testData[i - 1].open > testData[i - 1].close) {
      return '#DF3604';
    } else {
      return determineColor(i - 1);
    }
  };
  const filterUnwanted = (arr) => {
    const required = arr.filter((el) => {
      return el && el.open && el.close && el.low && el.high;
    });
    console.log(required.length);
    return required;
  };
  const formatBase = (value) => {
    return yootils.commas(value.toFixed(2));
  };
  //$: console.log(w);
  $: count = w <= 650 ? 40 : w <= 800 ? 60 : w <= 1000 ? 125 : w <= 1500 ? 150 : 175;
  $: ema12 = Ema(
    data.map((dat) => dat.close),
    12
  ).slice(data.length - count, data.length - 1);
  $: ema26 = Ema(
    data.map((dat) => dat.close),
    26
  ).slice(data.length - count, data.length - 1);
  $: testData = data.slice(data.length - count, data.length - 1);
  $: testData.forEach((dat, i) => {
    dat.ema12 = ema12[i];
    dat.ema26 = ema26[i];
  });
  $: console.log(testData);
  $: minX = Math.min.apply(
    null,
    testData.map((item) => item.openTimeInMillis)
  );
  $: console.log(testData[0]);
  $: maxX = Math.max.apply(
    null,
    testData.map((item) => item.openTimeInMillis)
  );
  $: minY = Math.min.apply(
    null,
    testData.map((item) => item.low)
  );

  $: maxY = Math.max.apply(
    null,
    testData.map((item) => item.high)
  );
  async function loadData() {
    let res = await fetch(`api/coinbase-pro/${tradingPair}.json?granularity=${granularity}`);
    let tempData = await res.json();
    tempGranularity = granularity;
    data = filterUnwanted(tempData.data);
  }
</script>

<div class="controlPanel">
  <h3>Coinbase Pro {testData[0].productId} Candlestick Chart (In Progress):</h3>
  <div class="controlInline">
    <label class="block">
      <span>Trading Pair:</span>
      <select bind:value={tradingPair} on:blur={loadData}>
        {#each pairs as pair}
          <option value={pair}>{pair}</option>
        {/each}
      </select>
    </label>
    <label class="block">
      <span>Candle Duration:</span>
      <select bind:value={granularity} on:blur={loadData}>
        {#each candleGranularity as period}
          <option value={period.value}>{period.label}</option>
        {/each}
      </select>
    </label>
    <label class="block">
      <input type="checkbox" bind:checked={ema12Enabled} />
      <span class="checkboxSpan blue">EMA 12</span>
    </label>

    <label class="block">
      <input type="checkbox" bind:checked={ema26Enabled} />
      <span class="checkboxSpan fuchsia">EMA 26</span>
    </label>
  </div>
</div>

<div bind:clientWidth={w} class="chart">
  <Pancake.Chart x1={minX} x2={maxX} y1={minY} y2={maxY}>
    <Pancake.Grid horizontal count={5} let:value let:first>
      <div class="grid-line horizontal"><span>{`$${yootils.commas(value)}`}</span></div>
    </Pancake.Grid>

    <Pancake.Grid vertical count={10} let:value>
      <div class="grid-line vertical" />
      <span class="x-label">{dayjs(value).format('HH:mm')}</span>
    </Pancake.Grid>

    {#each testData as d, i}
      {#if d && d.open && d.close && d.low && d.high && d.openTimeInMillis}
        {#if d.open > d.close}
          <Pancake.Box
            x1={d.openTimeInMillis}
            x2={d.openTimeInMillis + d.sizeInMillis}
            y1={d.open}
            y2={d.close}
          >
            <div
              class="box"
              style="background-color:#DF3604"
              title={`Open: $${formatBase(d.open)}\nClose: $${formatBase(
                d.close
              )}\nHigh: $${formatBase(d.high)}\nLow: $${formatBase(d.low)}`}
              use:tooltip
            />
          </Pancake.Box>
          <div style="pointer-events:none">
            <Pancake.Svg>
              <Pancake.SvgLine
                data={[
                  { og: d, locY: d.low },
                  { og: d, locY: d.high }
                ]}
                x={(d) => d.og.openTimeInMillis + d.og.sizeInMillis / 2}
                y={(d) => d.locY}
                let:d
              >
                <path class="trend" {d} style="stroke:#DF3604" />
              </Pancake.SvgLine>
            </Pancake.Svg>
          </div>
        {:else if d.close > d.open}
          <Pancake.Box
            x1={d.openTimeInMillis}
            x2={d.openTimeInMillis + d.sizeInMillis}
            y1={d.close}
            y2={d.open}
          >
            <div
              class="box"
              style="background-color:#22c55e"
              title={`Open: $${formatBase(d.open)}\nClose: $${formatBase(
                d.close
              )}\nHigh: $${formatBase(d.high)}\nLow: $${formatBase(d.low)}`}
              use:tooltip
            />
          </Pancake.Box>
          <div style="pointer-events:none">
            <Pancake.Svg>
              <Pancake.SvgLine
                data={[
                  { og: d, locY: d.low },
                  { og: d, locY: d.high }
                ]}
                x={(d) => d.og.openTimeInMillis + d.og.sizeInMillis / 2}
                y={(d) => d.locY}
                let:d
              >
                <path class="trend" {d} style="stroke:#22c55e" />
              </Pancake.SvgLine>
            </Pancake.Svg>
          </div>
        {:else}
          <Pancake.Box
            x1={d.openTimeInMillis}
            x2={d.openTimeInMillis + d.sizeInMillis}
            y1={d.open}
            y2={d.close}
          >
            <div
              class="box"
              style="background-color:{determineColor(i)}"
              title={`Open: $${formatBase(d.open)}\nClose: $${formatBase(
                d.close
              )}\nHigh: $${formatBase(d.high)}\nLow: $${formatBase(d.low)}`}
              use:tooltip
            />
          </Pancake.Box>
          <div style="pointer-events:none">
            <Pancake.Svg>
              <Pancake.SvgLine
                data={[
                  { og: d, locY: d.low },
                  { og: d, locY: d.high }
                ]}
                x={(d) => d.og.openTimeInMillis + d.og.sizeInMillis / 2}
                y={(d) => d.locY}
                let:d
              >
                <path class="trend" {d} style="stroke:{determineColor(i)}" />
              </Pancake.SvgLine>
            </Pancake.Svg>
          </div>
        {/if}
      {/if}
    {/each}
    {#if ema12Enabled}
      <div style="pointer-events:none">
        <Pancake.Svg>
          <Pancake.SvgLine
            data={testData}
            x={(d) => d.openTimeInMillis + d.sizeInMillis / 2}
            y={(d) => d.ema12}
            let:d
          >
            <path class="ema12" {d} />
          </Pancake.SvgLine>
        </Pancake.Svg>
      </div>
    {/if}
    {#if ema26Enabled}
      <div style="pointer-events:none">
        <Pancake.Svg>
          <Pancake.SvgLine
            data={testData}
            x={(d) => d.openTimeInMillis + d.sizeInMillis / 2}
            y={(d) => d.ema26}
            let:d
          >
            <path class="ema26" {d} />
          </Pancake.SvgLine>
        </Pancake.Svg>
      </div>
    {/if}
  </Pancake.Chart>
</div>

<style>
  .controlPanel {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
  }

  .controlInline {
    margin-left: auto;
    margin-right: auto;
    grid-gap: 1rem;
    gap: 1rem;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: -webkit-inline-flex;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .block {
    display: block;
  }

  select {
    margin-top: 0.25rem;
    display: block;
    width: 100%;
  }

  .checkboxSpan {
    margin-top: 0.25rem;
  }

  .fuchsia {
    color: #c026d3;
  }

  .blue {
    color: #1d4ed8;
  }

  .chart {
    height: 500px;
    padding: 3em 0 2em 3em;
    margin: 0 0 36px 0;
  }

  path.ema12 {
    stroke: #1d4ed8;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 1px;
    fill: none;
  }

  path.ema26 {
    stroke: #c026d3;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 1px;
    fill: none;
  }

  .grid-line {
    position: relative;
    display: block;
  }

  .grid-line.horizontal {
    width: calc(100% + 3em);
    left: -1.5em;
    border: 1px dashed rgba(204, 204, 204, 0.5);
  }

  .grid-line.vertical {
    height: 100%;
    border-left: 1px dashed rgba(204, 204, 204, 0.5);
  }

  .grid-line span {
    position: absolute;
    left: -3em;
    bottom: -0.5em;
    font-family: sans-serif;
    font-size: 14px;
    color: #999;
    line-height: 1;
  }

  .x-label {
    position: absolute;
    width: 4em;
    left: -2em;
    bottom: -22px;
    font-family: sans-serif;
    font-size: 14px;
    color: #999;
    text-align: center;
  }

  .box {
    position: absolute;
    left: 1px;
    width: calc(100% - 2px);
    height: 100%;
  }
</style>
