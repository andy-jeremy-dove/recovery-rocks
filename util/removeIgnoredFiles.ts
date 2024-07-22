import {ESLint} from 'eslint';

export default async function removeIgnoredFiles(files: string[]) {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(files.map(_ => eslint.isPathIgnored(_)));
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles.join(' ');
}
