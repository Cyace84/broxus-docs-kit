import "./main.scss";

import DefaultTheme from "vitepress/theme";

import AppLayout from "./../components/AppLayout.vue";
import Page from "./../components/Page.vue";
import AccordionComponent from "./../components/shared/Accordion.vue";
import DisconnectIcon from "./../components/shared/DisconnectIcon.vue";
import OutlineComponent from "./../components/shared/outline/Outline.vue";
import OutlineItem from "./../components/shared/outline/OutlineItem.vue";

export default {
  ...DefaultTheme,
  Layout: AppLayout,
  enhanceApp({ app }) {
    DefaultTheme.enhanceApp({ app });
    app.component("AppLayout", AppLayout);
    app.component("Page", Page);
    app.component("Outline", OutlineComponent);
    app.component("OutlineItem", OutlineItem);
    app.component("DisconnectIcon", DisconnectIcon);
    app.component("Accordion", AccordionComponent);
  },
};
