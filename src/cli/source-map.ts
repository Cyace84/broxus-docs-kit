import path from 'path';

export default {
  // walletControl: {
  //   src: path.join(__dirname, "src/components/WalletControl.vue"),
  //   dest: ".vitepress/theme/WalletControl.vue",
  // },
  // layout: {
  //   src: path.join(__dirname, "src/components.vue"),
  //   dest: ".vitepress/theme/Layout.vue",
  // },
  components: {
    src: path.join(__dirname, './../components'),
    dest: '.vitepress/theme/components',
    itsDir: true,
  },
  styles: {
    src: path.join(__dirname, './../styles'),
    dest: '.vitepress/theme/styles',
    itsDir: true,
  },
} as { [key: string]: { src: string; dest: string; itsDir?: boolean } };
