import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkEliLevels from './src/plugins/remark-eli-levels.mjs';

export default defineConfig({
  site: 'https://study.raymonds.dev',
  base: '/',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkEliLevels, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
