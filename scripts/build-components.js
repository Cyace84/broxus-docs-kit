const fs = require('fs');
const path = require('path');
const tsConfig = require('./../tsconfig.json');

function copyFileSync(source, target) {
  let targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  try {
    fs.writeFileSync(targetFile, fs.readFileSync(source));
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}

function copyFolderRecursiveSync(source, target) {
  if (fs.lstatSync(source).isDirectory()) {
    let files = [];

    // Check if folder needs to be created or integrated
    let targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }

    // Copy
    try {
      files = fs.readdirSync(source);
      files.forEach(function (file) {
        let curSource = path.join(source, file);
        if (fs.lstatSync(curSource).isDirectory()) {
          copyFolderRecursiveSync(curSource, targetFolder);
        } else {
          copyFileSync(curSource, targetFolder);
        }
      });
    } catch (err) {
      console.error(err);
      process.exitCode = 1;
    }
  }
}

const sources = ['src/theme/components', 'src/theme/styles'];
const target = tsConfig.compilerOptions.outDir;

sources.forEach(source => copyFolderRecursiveSync(source, target));
