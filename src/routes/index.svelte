<script context="module">
	export const prerender = true;
</script>

<script>
	import LifeExpt from '$lib/lifeExpt.svelte';
	import Co2 from '$lib/co2chart/index.svelte'
	import Pop from '$lib/population/index.svelte'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<Co2 />
	<Pop />
	<LifeExpt />
</section>
