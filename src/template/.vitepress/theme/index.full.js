import './main.scss';
// Theme components
import DefaultTheme from 'vitepress/theme';
import AppLayout from '@themeComponents/AppLayout.vue';
import Page from '@themeComponents/Page.vue';
import OutlineComponent from '@themeComponents/shared/outline/Outline.vue';
import OutlineItem from '@themeComponents/shared/outline/OutlineItem.vue';
import AccordionComponent from '@themeComponents/shared/Accordion.vue';
import DisconnectIcon from '@themeComponents/shared/DisconnectIcon.vue';
// Demo components
import PackDataSample from '@components/demos/PackDataSample.vue';

export default {
  ...DefaultTheme,
  Layout: AppLayout,
  enhanceApp({ app }) {
    DefaultTheme.enhanceApp({ app });
    app.component('AppLayout', AppLayout);
    app.component('Page', Page);
    app.component('Outline', OutlineComponent);
    app.component('OutlineItem', OutlineItem);
    app.component('DisconnectIcon', DisconnectIcon);
    app.component('Accordion', AccordionComponent);

    app.component('PackDataSample', PackDataSample);
  },
};
