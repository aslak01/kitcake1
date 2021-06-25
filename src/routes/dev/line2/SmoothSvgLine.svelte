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
  export let smoothing = 0.4

  const dataArray = data.map((d, i) => [conditionalRound($x_scale(x(d, i))), conditionalRound($y_scale(y(d, i)))])

  // https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
  const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointB[1]
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX)
    }
  }

  const controlPoint = (current, previous, next, reverse) => {
    const p = previous || current
    const n = next || current

    const o = line(p, n)

    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing

    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length

    return [x, y]
  }

  const bezierCommand = (point, i, a) => {
    const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point)
    const [cpeX, cpeY] = controlPoint(point, a[i -1], a[i + 1], true)

    return `C ${cpsX}, ${cpsY} ${cpeX}, ${cpeY} ${point[0]}, ${point[1]}`
  }

  const svgPath = (points, command) => {
    const d = points.reduce((acc, point, i, a) => i === 0
      ? `M ${point[0]},${point[1]}`
      : `${acc} ${command(point, i, a)}`
    , '')
    return d
  }

  $: d = svgPath(dataArray, bezierCommand)


	// $: d = 'M' + data
	// 	.map((d, i) => `${ conditionalRound($x_scale(x(d, i))) }, ${conditionalRound($y_scale(y(d, i)))}`)
  //   .join(' L ')
</script>

<slot {d}></slot>