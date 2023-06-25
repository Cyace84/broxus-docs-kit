import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";

const HELP_URL = "{{HELP_URL}}";
const FEEDBACK_URL = "{{FEEDBACK_URL}}";
const GITHUB_URL = "{{GITHUB_URL}}";

module.exports = {
  title: "{{docTitle}}",
  base: "",
  description: "{{projectName}}",

  plugins: [vue(), Components({ dst: true })],
  resolve: {
    alias: {
      "@themeComponents": resolve(__dirname, "{{componentsPath}}"),
      "@themeStyles": resolve(__dirname, "{{stylesPath}}"),
      "@components": "./../src/components",
      "@styles": "./../src/styles",
    },
  },
  themeConfig: {
    search: {
      provider: "local",
    },
    nav: [
      { text: "Feedback", link: FEEDBACK_URL },
      { text: "Community", link: HELP_URL },
    ],
    sidebar: [
      { text: "Introduction", link: "/" },
      {
        text: "Guide",
        collapsable: false,

        items: [
          {
            text: "Sample Page",
            collapsable: false,
            link: "/guides/sample-guide.md",
          },
        ],
      },
      {
        text: "API Reference",
        collapsable: false,

        items: [
          {
            text: "Sample Page",
            collapsable: false,
            link: "/api-reference/sample-page.md",
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: GITHUB_URL }],
  },

  esbuild: {
    target: ["chrome89", "edge89", "firefox79", "safari14.1"],
  },
};
