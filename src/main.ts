import { program } from 'commander';
import { setup as setup } from './setup';
import exec from '@simplyhexagonal/exec';
import fsExtra from 'fs-extra';
import path from 'path';

export { setup as create } from './setup';

main();

async function main() {
  program.name('setup').addHelpText(
    'after',
    `
        
        Use this script to setup the project.`
  );

  program
    .option(
      '--directory <path>',
      'The path of the directory where the package will be created'
    )
    .option('--package-name <name>', 'The name of the package')
    .option(
      '--description Creates typescript npm package',
      'The description of the package'
    )
    .option('--repository-url <url>', 'The url of the repository');

  program.parse(process.argv);

  const {
    directory = 'typescript-npm-package',
    packageName,
    description = '',
    repositoryUrl = '',
  } = program.opts<Options>();
  if (!packageName) throw new Error('Please provide a package name by using --package-name option');

  if (await fsExtra.pathExists(directory)) {
    throw new Error(`The directory ${directory} already exists`);
  }

  const { execPromise: gitInitExecPromise } = exec(`git clone https://github.com/FreePhoenix888/typescript-npm-package-template.git ${directory}`);
  const gitInitResult = await gitInitExecPromise;
  if (gitInitResult.exitCode !== 0) {
    throw new Error(gitInitResult.stderrOutput);
  }
  console.log(gitInitResult.stdoutOutput);
  await fsExtra.remove(path.join(directory, '.git'));

  await setup({ packageName, description, repositoryUrl, path: directory });
}

export interface Options {
  directory: string;
  packageName: string;
  description: string;
  repositoryUrl: string;
}
