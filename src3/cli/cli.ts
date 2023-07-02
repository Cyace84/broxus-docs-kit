import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import tty from 'tty';

import { copyTemplateFiles, createConfigFile } from './utils';

if (tty.isatty(0)) {
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', function (chunk, key) {
    if (key && key.name === 'c' && key.ctrl) {
      // eslint-disable-next-line no-console
      console.log('\n\nOperation cancelled by user.');
      process.exit();
    }
  });
}

async function main() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf8'));

  const response = await prompts([
    {
      type: 'text',
      name: 'docTitle',
      message: 'Enter the title of the documentation',
      initial: packageJson.name + '-docs' || '',
    },
    {
      type: 'text',
      name: 'projectName',
      message: 'Enter the name of the project to be documented',
      initial: packageJson.name || '',
    },
    {
      type: 'select',
      name: 'mode',
      message: 'Choose your mode',
      choices: [
        {
          title: 'Light',
          description: 'In Light mode, key components and styles will be imported from node modules.',
          value: 'light',
        },
        {
          title: 'Full',
          description:
            'In Full mode, everything will be installed in the user directory, but you must then keep track of updates yourself.',
          value: 'full',
        },
      ],
      initial: 0,
    },
    {
      type: 'text',
      name: 'folderName',
      message: 'Enter the name of the folder where the template will be created',
      initial: 'docs',
    },
    {
      type: 'confirm',
      name: 'askLinks',
      message: 'Do you want to add links (GitHub, Feedback, etc.)?',
      initial: false,
    },
  ]);

  let HELP_URL = 'https://t.me/everdev';
  let FEEDBACK_URL = '';
  let GITHUB_URL = packageJson.repository || '';

  if (response.askLinks) {
    const linkResponse = await prompts([
      {
        type: 'text',
        name: 'GITHUB_URL',
        message: 'Enter the GitHub URL',
        initial: packageJson.repository || ' ',
      },
      {
        type: 'text',
        name: 'FEEDBACK_URL',
        message: 'Enter the feedback URL',
      },
      {
        type: 'text',
        name: 'HELP_URL',
        message: 'Enter the help URL',
        initial: 'https://t.me/everdev',
      },
    ]);
    GITHUB_URL = linkResponse.GITHUB_URL;
    FEEDBACK_URL = linkResponse.FEEDBACK_URL;
    HELP_URL = linkResponse.HELP_URL;
  }

  if (fs.existsSync(response.folderName)) {
    const continueResponse = await prompts([
      {
        type: 'confirm',
        name: 'continue',
        message: `Directory ${response.folderName} already exists and is not empty. Continuing may overwrite existing files. Do you want to continue?`,
        initial: false,
      },
    ]);
    if (!continueResponse.continue) {
      // eslint-disable-next-line no-console
      console.log('Operation cancelled by user. Exiting...');
      process.exit(0);
    }
  }

  const { docTitle, projectName, mode, folderName } = response;
  // eslint-disable-next-line no-console
  console.log(
    '\n',
    '\x1b[1m🚀 Creating\x1b[0m',
    '\x1b[1m' + mode + '\x1b[0m',
    '\x1b[1mmode documentation for project\x1b[0m',
    '\x1b[1m"' + projectName + '"\x1b[0m',
    '\x1b[1mwith title\x1b[0m',
    '\x1b[1m"' + docTitle + '"\x1b[0m',
    '\x1b[1min folder\x1b[0m',
    '\x1b[1m"' + folderName + '"...\x1b[0m',
    '📚'
  );

  await copyTemplateFiles(folderName, mode);

  createConfigFile({
    docTitle: docTitle,
    projectName: projectName,
    folderName: folderName,
    HELP_URL: HELP_URL,
    FEEDBACK_URL: FEEDBACK_URL,
    GITHUB_URL: GITHUB_URL,
    stylesPath: mode === 'light' ? 'broxus-docs-kit-dev/dist/theme/styles' : './theme/styles',
  });

  // eslint-disable-next-line no-console
  console.log(
    '\n',
    '\x1b[1m\x1b[32m%s\x1b[0m',
    '🚀 Initiating dependencies installation... This may take a while, depending on your internet speed and computer power.'
  );

  exec('npm install', { cwd: folderName }, (error, stdout, stderr) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`Error: ${error.message}`);

      return;
    }
    if (stderr) {
      // eslint-disable-next-line no-console
      console.error(`Error: ${stderr}`);

      return;
    }
    // eslint-disable-next-line no-console
    console.log(`Output: ${stdout}`);
  });
  // eslint-disable-next-line no-console
  console.log('\x1b[1m\x1b[32m%s\x1b[0m', '\n✅ Done! Your project is ready for lift off!');
}

main().catch(error => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
