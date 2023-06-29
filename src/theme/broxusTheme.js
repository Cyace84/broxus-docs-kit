import BDKLayout from './components/BDKLayout.vue';
import BDKPage from './components/BDKPage.vue';
import BDKAccordion from './components/shared/BDKAccordion.vue';
import BDKDisconnectIcon from './components/shared/BDKDisconnectIcon.vue';
import BDKOutline from './components/shared/outline/BDKOutline.vue';
import BDKOutlineItem from './components/shared/outline/BDKOutlineItem.vue';

import './main.scss';

export default {
  Layout: BDKLayout,
  async enhanceApp({ app }) {
    const DefaultTheme = (await import('vitepress/theme')).default;
    Object.assign(app, DefaultTheme);
    app.component('BDKLayout', BDKLayout);
    app.component('BDKPage', BDKPage);
    app.component('BDKOutline', BDKOutline);
    app.component('BDKOutlineItem', BDKOutlineItem);
    app.component('BDKDisconnectIcon', BDKDisconnectIcon);
    app.component('BDKAccordion', BDKAccordion);
  },
};
