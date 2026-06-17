import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://chrisv.example.com',
  integrations: [mdx(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
