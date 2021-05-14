<script context="module">
	import LifeExpt from '$lib/Examples/Lifeexp/index.svelte';
	import Co2 from '$lib/Examples/co2chart/index.svelte'
	import Pop from '$lib/Examples/population/index.svelte'


</script>

<svelte:head>
	<title>Examples</title>
</svelte:head>

<section>
	<Co2 />
	<Pop />
	<LifeExpt />
</section>

