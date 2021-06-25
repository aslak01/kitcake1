<script>
  // import { getChartContext } from './Chart.svelte';
  // import { default_x, default_y } from '../utils/accessors.mjs';
  import { getChartContext } from '@sveltejs/pancake/components/Chart.svelte'
  import { default_x, default_y } from '@sveltejs/pancake/utils/accessors.mjs';
  
  import { conditionalRound } from './utils.js'

	const { x_scale, y_scale } = getChartContext();

	export let data;
	export let x = default_x;
	export let y = default_y;

  const dataLength = data.length

	$: d = 'M' + data
		.map((d, i) => `${ conditionalRound($x_scale(x(d, i))) }, ${conditionalRound($y_scale(y(d, i)))}`)
    .join(' L ')
</script>

<slot {d}></slot>