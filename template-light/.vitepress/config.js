import vue from '@vitejs/plugin-vue';

const HELP_URL = '{{HELP_URL}}';
const FEEDBACK_URL = '{{FEEDBACK_URL}}';
const GITHUB_URL = '{{GITHUB_URL}}';

const NAV = [
  {
    text: 'Broxus Docs',
    items: [
      { text: 'Home', link: 'https://docs.broxus.com' },
      { text: 'Inpage Provider', link: 'https://provider-docs.broxus.com/' },
      { text: 'Locklift', link: '/' },
      { text: 'OctusBridge Integration', link: 'https://integrate.octusbridge.io/' },
      {
        text: 'TIP-3 Api Reference',
        link: 'https://tip3-api-reference.netlify.app/',
      },
    ],
  },
  { text: 'Feedback', link: FEEDBACK_URL },
  { text: 'Community', link: HELP_URL },
];

module.exports = {
  title: '{{docTitle}}',
  base: '/',
  description: '{{projectName}}',

  plugins: [vue()],
  themeConfig: {
    search: {
      provider: 'local',
    },
    nav: NAV,
    sidebar: [
      { text: 'Introduction', link: '/' },
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
