import './main.scss';
// Theme components
import DefaultTheme from 'vitepress/theme';
import {
  BDKLayout,
  BDKPage,
  BDKOutlineComponent,
  BDKOutlineItem,
  BDKAccordionComponent,
  BDKDisconnectIcon,
} from 'broxus-docs-kit-dev';
// import BDKPage from '@themeComponents/BDKPage.vue';
// import BDKOutlineComponent from '@themeComponents/shared/outline/BDKOutline.vue';
// import BDKOutlineItem from '@themeComponents/shared/outline/BDKOutlineItem.vue';
// import BDKAccordionComponent from '@themeComponents/shared/BDKAccordion.vue';
// import BDKDisconnectIcon from '@themeComponents/shared/BDKDisconnectIcon.vue';
// Demo components
import PackDataSample from '@components/demos/PackDataSample.vue';

export default {
  ...DefaultTheme,
  Layout: AppLayout,
  enhanceApp({ app }) {
    DefaultTheme.enhanceApp({ app });
    app.component('BDKLayout', BDKLayout);
    app.component('BDKPage', BDKPage);
    app.component('BDKOutline', BDKOutlineComponent);
    app.component('BDKOutlineItem', BDKOutlineItem);
    app.component('BDKDisconnectIcon', BDKDisconnectIcon);
    app.component('BDKAccordion', BDKAccordionComponent);

    app.component('PackDataSample', PackDataSample);
  },
};
