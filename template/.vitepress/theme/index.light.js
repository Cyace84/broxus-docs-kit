import { BroxusTheme } from 'broxus-docs-kit-dev';

import PackDataSample from '@components/demos/PackDataSample.vue';

export default {
  ...BroxusTheme,
  enhanceApp({ app }) {
    DefaultTheme.enhanceApp({ app });

    app.component('PackDataSample', PackDataSample);
  },
};
