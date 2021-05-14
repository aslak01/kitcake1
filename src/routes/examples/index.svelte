<script context="module">
	const modules = import.meta.glob('./*/index.svelte')
</script>
<script>
	import LifeExpt from './lifeexp/index.svelte';
	import Co2 from './co2chart/index.svelte'
	import Pop from './population/index.svelte'

	const modules = import.meta.glob('./*/index.svelte')
	$: console.log("import.meta.glob", modules)

</script>

<svelte:head>
	<title>Examples</title>
</svelte:head>

<section>
	<!-- <pre>
		{#if modules}
			{#each modules as module}
				{module}
			{/each}
		{/if}
	</pre> -->
	<Co2 />
	<Pop />
	<LifeExpt />
</section>

