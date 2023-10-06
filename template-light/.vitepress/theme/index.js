import BroxusTheme from 'broxus-docs-kit-dev/theme/BroxusTheme';

import PackDataSample from './../../src/components/demos/PackDataSample.vue';

export default {
  ...BroxusTheme,
  enhanceApp({ app }) {
    DefaultTheme.enhanceApp({ app });

    app.component('PackDataSample', PackDataSample);
  },
};
