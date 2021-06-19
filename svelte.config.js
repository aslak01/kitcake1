//import node from '@sveltejs/adapter-node'
import vercel from '@sveltejs/adapter-vercel';

const config = {
  kit: {
    adapter: vercel(),
    target: '#svelte',
    // vite: {
    //   optimizeDeps: {
    //     include: ["highlight.js/lib/core"],
    //   },
    // },
    
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
