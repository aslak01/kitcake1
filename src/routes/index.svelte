<script context="module">
  import { browser, dev } from '$app/env';
  // we don't need any JS on this page, though we'll load
  // it in dev so that we get hot module replacement...
  export const hydrate = dev;

  // ...but if the client-side router is already loaded
  // (i.e. we came here from elsewhere in the app), use it
  export const router = browser;

  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<svelte:head>
  <title>Pancake Kit</title>
</svelte:head>

<div class="content">
  <h1>Pancake Kit</h1>

  <p>
    This is an example of combining <a href="https://kit.svelte.dev">SvelteKit</a> with the
    <a href="https://pancake-charts.surge.sh/">Pancake</a> library, aiming to provide more some community
    sourced documentation and examples of what the library can do.
  </p>
</div>

<style>
  .content {
    width: 100%;
    max-width: var(--column-width);
    margin: var(--column-margin-top) auto 0 auto;
  }
</style>
