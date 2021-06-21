<script>
	import * as Pancake from '@sveltejs/pancake';
	import * as d3 from 'd3-hierarchy';
	import {tweened} from 'svelte/motion';
	import * as eases from 'svelte/easing';
	import {fade} from 'svelte/transition';
	import * as yootils from 'yootils';
	import Treemap from './Treemap.svelte';
	import spData from './sp500.js'
	import data from './data.js'
	import {calcPctChange} from './utils.js'
	
	function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
	spData["data"].forEach((dat, i) => {
		let tempSector = findWithAttr(data.children, 'name', dat["sector"])
		let tempIndustry = findWithAttr(data.children[tempSector].children, 'name', dat["industry"])
		data.children[tempSector].children[tempIndustry].children.push({name: dat["ticker"], value: dat["shrOutstnd"] * dat["price"], pctChange: dat["pctChange"]})
	})
	
	calcPctChange(data.children)

	const treemap = d3.treemap();

	const hierarchy = d3.hierarchy(data)
		.sum(d => d.value)
		.sort((a, b) => b.value - a.value)
	

	const root = treemap(hierarchy);

	let selected = root;

	const select = node => {
		while (node.parent && node.parent !== selected) {
			node = node.parent;
		}

		if (node && node.children) selected = node;
	};

	const breadcrumbs = node => {
		const crumbs = [];
		while (node) {
			crumbs.unshift(node.data.name)
			node = node.parent;
		}

		return crumbs.join('/');
	};

	const extents = tweened(undefined, {
		easing: eases.cubicOut,
		duration: 600
	});

	const is_visible = (a, b) => {
		while (b) {
			if (a.parent === b) return true;
			b = b.parent;
		}

		return false;
	};

	$: $extents = {
		x1: selected.x0,
		x2: selected.x1,
		y1: selected.y1,
		y2: selected.y0
	};
	
</script>

<button class="breadcrumbs" disabled="{!selected.parent}" on:click="{() => selected = selected.parent}">
	{breadcrumbs(selected)}
</button>

<div class="chart">
	<Pancake.Chart x1={$extents.x1} x2={$extents.x2} y1={$extents.y1} y2={$extents.y2}>
		<Treemap {root} let:node>
			{#if is_visible(node, selected)}
				<div
					transition:fade={{duration:350}}
					class="node"
					class:leaf={!node.children}
					on:click="{() => select(node)}"
				>
					<div class:negative={node.data.pctChange<0} class="contents">
						<strong>{node.data.name}</strong>
						<span>{`$${yootils.commas(node.value)}`}</span>
						<span>{`${node.data.pctChange.toFixed(2)}%`}</span>
					</div>
				</div>
			{/if}
		</Treemap>
	</Pancake.Chart>
</div>

<p>Adapted from <a href="https://observablehq.com/@d3/zoomable-treemap">Zoomable Treemap by Mike Bostock </a>using Rich Harris' <a href='https://github.com/Rich-Harris/pancake#readme'>@sveltejs/pancake Charting library</a>.</p>

<style>
	.breadcrumbs {
		width: 100%;
		padding: 0.3rem 0.4rem;
		background-color: transparent;
		font-family: inherit;
		font-size: inherit;
		text-align: left;
		border: none;
		cursor: pointer;
		outline: none;
	}

	.breadcrumbs:disabled {
		cursor: default;
	}

	.chart {
		width: calc(100% + 2px);
		height: 500px;
		padding: 0;
		margin: 0 -1px 36px -1px;
		overflow: hidden;
	}

	.node {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: white;
		overflow: hidden;
		pointer-events: all;
	}

	.node:not(.leaf) {
		cursor: pointer;
	}

	.contents {
		width: 100%;
		height: 100%;
		padding: 0.3rem 0.4rem;
		border: 1px solid white;
		background-color: hsl(120, 40%, 50%);
		color: white;
		border-radius: 4px;
		box-sizing: border-box;
	}
	
	.contents.negative {
		width: 100%;
		height: 100%;
		padding: 0.3rem 0.4rem;
		border: 1px solid white;
		background-color: hsl(0, 40%, 50%);
		color: white;
		border-radius: 4px;
		box-sizing: border-box;
	}

	.node:not(.leaf) .contents {
		background-color: hsl(120, 40%, 38%);
	}
	
	.node:not(.leaf) .contents.negative {
		background-color: hsl(0, 50%, 40%);
	}

	strong, span {
		display: block;
		font-size: 12px;
		white-space: nowrap;
		line-height: 1;
	}
</style>