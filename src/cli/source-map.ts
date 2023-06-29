import path from 'path';

export default {
  components: {
    src: path.join(__dirname, './../theme/components'),
    dest: '.vitepress/theme/components',
    itsDir: true,
  },
  styles: {
    src: path.join(__dirname, './../theme/styles'),
    dest: '.vitepress/theme/styles',
    itsDir: true,
  },
} as { [key: string]: { src: string; dest: string; itsDir?: boolean } };
