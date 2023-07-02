import fs from 'fs';
import { copySync } from 'fs-extra';
import path from 'path';

import fileConfig from './source-map';
const TEMPLATE_PATH = path.join(__dirname, '../../template');

interface ConfigParams {
  docTitle: string;
  projectName: string;
  folderName: string;
  HELP_URL: string;
  FEEDBACK_URL: string;
  GITHUB_URL: string;
  stylesPath: string;
}
export function createConfigFile(params: ConfigParams) {
  const configUrl = path.join(params.folderName, '.vitepress/config.js');
  let configFile = fs.readFileSync(configUrl, 'utf8');

  for (const [key, value] of Object.entries(params)) {
    configFile = configFile.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }

  fs.writeFileSync(configUrl, configFile);
}

function copyFile(src: string, dest: string, mode: string) {
  const file = path.basename(src);

  if (file.endsWith(`.${mode}.js`) || file.endsWith(`.${mode}.scss`)) {
    const newFileName = file.replace(`.${mode}`, ''); // Remove the mode from the filename.
    const newDestPath = path.join(path.dirname(dest), newFileName);
    fs.copyFileSync(src, newDestPath);
  } else if (
    !file.endsWith('.full.js') &&
    !file.endsWith('.light.js') &&
    !file.endsWith('.full.scss') &&
    !file.endsWith('.light.scss')
  ) {
    fs.copyFileSync(src, dest);
  }
}

function copyRecursive(src: string, dest: string, mode: string) {
  const copyDirectory = () => {
    fs.readdirSync(src).forEach(file => {
      const srcFile = path.join(src, file);
      let destFile;
      if (file.endsWith('.light.js')) {
        const newFileName = file.replace('.light.js', '.js');
        destFile = path.join(dest, newFileName);
      } else {
        destFile = path.join(dest, file);
      }

      if (fs.statSync(srcFile).isDirectory()) {
        if (!fs.existsSync(destFile)) {
          fs.mkdirSync(destFile);
        }
        copyRecursive(srcFile, destFile, mode);
      } else {
        copyFile(srcFile, destFile, mode);
      }
    });
  };

  if (fs.statSync(src).isDirectory()) {
    copyDirectory();
  } else {
    copyFile(src, dest, mode);
  }
}

async function copyAdditionalFiles(folderName: string) {
  for (const key in fileConfig) {
    const src = fileConfig[key].src;
    const dest = path.join(folderName, fileConfig[key].dest);

    const srcStats = fs.lstatSync(src);
    if (srcStats.isSymbolicLink()) {
      // TODO document why this block is empty
    } else if (srcStats.isDirectory()) {
      copySync(src, dest);
    } else {
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
    }
  }
}

export async function copyTemplateFiles(folderName: string, mode: string) {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }

  copyRecursive(TEMPLATE_PATH, folderName, mode);

  if (mode === 'full') {
    await copyAdditionalFiles(folderName);
  }
}
