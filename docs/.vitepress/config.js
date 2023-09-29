import vue from '@vitejs/plugin-vue';

const HELP_URL = 'https://t.me/';
const FEEDBACK_URL = '';
const GITHUB_URL = '';

module.exports = {
  title: 'Broxus Docs Kit Docs',
  base: '/',
  description: 'broxus-docs-kit',

  plugins: [vue()],
  themeConfig: {
    search: {
      provider: 'local',
    },
    // nav: [
    //   { text: 'Feedback', link: FEEDBACK_URL },
    //   { text: 'Community', link: HELP_URL },
    // ],
    sidebar: [
      { text: 'Overview', link: '/' },
      {
        text: 'Guide',
        collapsable: false,

        items: [
          {
            text: 'Sample Page',
            collapsable: false,
            link: '/guides/sample-guide.md',
          },
        ],
      },
      {
        text: 'API Reference',
        collapsable: false,

        items: [
          {
            text: 'Sample Page',
            collapsable: false,
            link: '/api-reference/sample-page.md',
          },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: GITHUB_URL }],
  },

  esbuild: {
    target: ['chrome89', 'edge89', 'firefox79', 'safari14.1'],
  },
};
