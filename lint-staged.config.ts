import type {Config} from 'lint-staged';

import {commonExtensions} from './util/extensions';
import removeIgnoredFiles from './util/removeIgnoredFiles';

export default {
  [`*{${['.json', ...commonExtensions].join(',')}}`]: async files => {
    const filesToLint = await removeIgnoredFiles(files);
    return [
      `prettier --check ${filesToLint}`,
      `eslint --max-warnings=0 ${filesToLint}`,
    ];
  },
} satisfies Config;
