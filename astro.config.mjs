import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config/site.ts';

export default defineConfig({
  site: 'https://w4nn4d13.tech',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        // exclude 404
        return !page.includes('/404');
      },
      serialize(item) {
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      langs: [
        'python', 'javascript', 'typescript', 'bash', 'shell', 'c', 'cpp',
        'java', 'go', 'rust', 'php', 'ruby', 'sql', 'html', 'css', 'json',
        'yaml', 'toml', 'dockerfile', 'powershell', 'solidity',
      ],
      wrap: false,
    },
    remarkPlugins: [],
    rehypePlugins: [],
    gfm: true,
  },
  output: 'static',
  build: {
    assets: '_assets',
  },
});
