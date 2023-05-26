import { program } from 'commander';
import { setup as setup } from './setup';

export { setup as create } from './setup';

main();

async function main() {
  program.name('setup').addHelpText(
    'after',
    `
        
        Use this script to setup the project.`
  );

  program
    .option('--package-name <name>', 'The name of the package')
    .option(
      '--description Creates typescript npm package',
      'The description of the package'
    )
    .option('--repository-url <url>', 'The url of the repository');

  program.parse(process.argv);

  const { packageName, description, repositoryUrl } = program.opts();

  

  await setup({ packageName, description, repositoryUrl });
}
