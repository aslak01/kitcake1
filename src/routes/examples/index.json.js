import fs from 'fs';  
export function get() {
  const modules = import.meta.globEager('./*/index.svelte');

  const charts = JSON.stringify(Object.values(modules).map((mod) => ({ Chart: mod.default })));
  const chartCode = JSON.stringify(Object.keys(modules).map((mod) => ({ ChartCode: fs.readFileSync('./src/routes/examples' + mod.substr(1)) })));

  return { charts, chartCode }

  // const { slug } = params;

  // const { metadata, content } = process(`src/posts/${slug}.md`);
  // const body = JSON.stringify({ metadata, content });

  // return { body }


}
