import type {Config} from 'lint-staged';

import {commonExtensions} from './util/extensions';
import removeIgnoredFiles from './util/removeIgnoredFiles';

export default {
  [`*{${['.json', ...commonExtensions].join(',')}}`]: files => {
    const filesToFormat = files.map(_ => `'${_}'`).join(' ');
    return `pnpm exec prettier --check ${filesToFormat}`;
  },
  [`*{${[...commonExtensions].join(',')}}`]: async files => {
    const filesToLint = await removeIgnoredFiles(files);
    return `pnpm exec eslint --max-warnings=0 ${filesToLint}`;
  },
} satisfies Config;
