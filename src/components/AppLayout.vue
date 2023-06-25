<script setup>
// eslint-disable-next-line import/no-unresolved
import DefaultTheme from 'vitepress/theme';

import WalletControl from './WalletControl.vue';

const { Layout: AppLayout } = DefaultTheme;
</script>

<template>
  <AppLayout>
    <template #nav-bar-content-after>
      <Suspense><WalletControl /></Suspense>
    </template>
  </AppLayout>
</template>
