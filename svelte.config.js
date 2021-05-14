// import node from '@sveltejs/adapter-node'
import vercel from '@sveltejs/adapter-vercel';

const config = {
	kit: {
		adapter: vercel(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		// vite: {
    //   ssr: {
    //     noExternal: []
    //   },
    //   optimizeDeps: {
    //     include: ['@sveltejs/pancake']
    //   }
    // }
	}
};

export default config;
