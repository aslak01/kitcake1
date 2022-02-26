<script>
  import { getChartContext } from '@sveltejs/pancake/components/Chart.svelte'
  import { default_x, default_y } from '@sveltejs/pancake/utils/accessors.mjs'

  import { conditionalRound } from './utils.js'
  import { svgPath, bezierCommand } from './smoothing.js'

  const { x_scale, y_scale } = getChartContext()

  export let data
  export let x = default_x
  export let y = default_y
  export let smoothing = 0.3

  $: dataArray = data.map((d, i) => [
    conditionalRound($x_scale(x(d, i))),
    conditionalRound($y_scale(y(d, i)))
  ])

  $: d = svgPath(dataArray, bezierCommand, smoothing)

  // $: d = `M${data.map((d, i) => `${conditionalRound($x_scale(x(d, i)))},${conditionalRound($y_scale(y(d, i)))}`).join('L')}`;
</script>

<slot {d} />
