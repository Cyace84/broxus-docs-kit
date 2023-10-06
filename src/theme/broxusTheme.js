import './main.css';
import 'vue-toastification/dist/index.css';

import DefaultTheme from 'vitepress/theme';
import Toast from 'vue-toastification';

import { toast } from './../helpers/toast';
// Theme components
import BDKLayout from './components/BDKLayout.vue';
import BDKPage from './components/BDKPage.vue';
import BDKSimpleToast from './components/BDKSimpleToast.vue';
import PackDataSample from './components/demos/PackDataSample.vue';
import BDKAccordionComponent from './components/shared/BDKAccordion.vue';
import BDKDisconnectIcon from './components/shared/BDKDisconnectIcon.vue';
import BDKOutlineComponent from './components/shared/outline/BDKOutline.vue';
import BDKOutlineItem from './components/shared/outline/BDKOutlineItem.vue';

export default {
  ...DefaultTheme,
  Layout: BDKLayout,
  enhanceApp({ app }) {
    DefaultTheme.enhanceApp({ app });
    app.use(Toast, {
      position: 'top-right',
      timeout: 5000,
      closeOnClick: false,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.7,

      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,
      rtl: false,
    });
    app.config.errorHandler = function (err) {
      toast(err.message, 0);
    };

    app.component('BDKSimpleToast', BDKSimpleToast);
    app.component('BDKPage', BDKPage);
    app.component('BDKOutline', BDKOutlineComponent);
    app.component('BDKOutlineItem', BDKOutlineItem);
    app.component('BDKDisconnectIcon', BDKDisconnectIcon);
    app.component('BDKAccordion', BDKAccordionComponent);

    app.component('PackDataSample', PackDataSample);
  },
};
