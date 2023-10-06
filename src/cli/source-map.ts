import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

// Получаем путь к текущему файлу и директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  components: {
    src: path.join(__dirname, './../../template/.vitepress/theme/components'),
    dest: '.vitepress/theme/components',
    itsDir: true,
  },
  styles: {
    src: path.join(__dirname, './../../template/.vitepress/theme/styles'),
    dest: '.vitepress/theme/styles',
    itsDir: true,
  },
} as { [key: string]: { src: string; dest: string; itsDir?: boolean } };
