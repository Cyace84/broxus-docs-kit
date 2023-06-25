import fs from "fs";
import { copySync } from "fs-extra";
import path from "path";

interface ConfigParams {
  docTitle: string;
  projectName: string;
  folderName: string;
  HELP_URL: string;
  FEEDBACK_URL: string;
  GITHUB_URL: string;
  componentsPath: string;
  stylesPath: string;
}
export function createConfigFile(params: ConfigParams) {
  const configUrl = path.join(params.folderName, ".vitepress/config.js");
  let configFile = fs.readFileSync(configUrl, "utf8");

  for (const [key, value] of Object.entries(params)) {
    configFile = configFile.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  fs.writeFileSync(configUrl, configFile);
}

async function copyTemplateFiles(folderName: string, mode: string) {
  const templatePath = path.join(__dirname, "../../src/template");

  const copyRecursive = (src: string, dest: string) => {
    if (fs.statSync(src).isDirectory()) {
      fs.readdirSync(src).forEach((file) => {
        const srcFile = path.join(src, file);
        const destFile = path.join(dest, file);

        if (fs.statSync(srcFile).isDirectory()) {
          if (!fs.existsSync(destFile)) {
            fs.mkdirSync(destFile);
          }
          copyRecursive(srcFile, destFile);
        } else {
          if (file.endsWith(`.${mode}.js`) || file.endsWith(`.${mode}.scss`)) {
            const newFileName = file.replace(`.${mode}`, ""); // Remove the mode from the filename.
            fs.copyFileSync(srcFile, path.join(dest, newFileName));
          } else if (
            !file.endsWith(".full.js") &&
            !file.endsWith(".light.js") &&
            !file.endsWith(".full.scss") &&
            !file.endsWith(".light.scss")
          ) {
            fs.copyFileSync(srcFile, destFile);
          }
        }
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }

  copyRecursive(templatePath, folderName);

  if (mode === "full") {
    await copyAdditionalFiles(folderName);
  }
}

async function copyAdditionalFiles(folderName: string) {
  const fileConfig = require("./source-map").default;
  for (const key in fileConfig) {
    //@ts-ignore
    const src = fileConfig[key].src;
    //@ts-ignore
    const dest = path.join(folderName, fileConfig[key].dest);

    const srcStats = fs.lstatSync(src);
    if (srcStats.isSymbolicLink()) {
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

export { copyTemplateFiles };
