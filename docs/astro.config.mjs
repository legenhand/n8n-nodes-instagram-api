import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://legenhand.github.io',
  base: '/n8n-nodes-instagram-api',
  integrations: [
    starlight({
      title: 'n8n Instagram API',
      logo: {
        src: './src/assets/logo.svg',
      },
      social: {
        github: 'https://github.com/legenhand/n8n-nodes-instagram-api',
      },
      editLink: {
        baseUrl: 'https://github.com/legenhand/n8n-nodes-instagram-api/edit/main/docs/',
      },
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Node Operations',
          autogenerate: { directory: 'operations' },
        },
        {
          label: 'AI & Automations',
          autogenerate: { directory: 'ai' },
        },
        {
          label: 'Reference & Help',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
