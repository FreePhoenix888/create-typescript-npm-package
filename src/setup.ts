import fs from 'fs';
import { glob } from 'glob';

export async function setup({
  packageName,
  description,
  repositoryUrl,
}: CreateParam) {
  if (!packageName) throw new Error('Please provide a package name');
  if (!description) throw new Error('Please provide a description');
  if (!repositoryUrl) throw new Error('Please provide a repository url');

  const replacementDictionary = {
    '<PACKAGE_NAME>': packageName,
    '<DESCRIPTION>': description,
    '<REPOSITORY_URL>': repositoryUrl,
  };

  let files = await glob('./**/*', {
    ignore: ['./node_modules/**/*'],
    withFileTypes: true,
  });
  files = files.filter((file) => file.isFile());

  for (const file of files) {
    let fileContent = fs.readFileSync(file.path, 'utf-8');
    for (const [key, value] of Object.entries(replacementDictionary)) {
      fileContent = fileContent.replace(key, value);
    }
    fs.writeFileSync(file.path, fileContent);
  }
}

export interface CreateParam {
  packageName: string;
  description: string;
  repositoryUrl: string;
}
