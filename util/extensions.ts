const jsExtensions = new Set([
  '.js',
  '.cjs',
  '.mjs',
  '.jsx',
  '.cjsx',
  '.mjsx',
] as const);
export const tsExtensions = new Set([
  '.ts',
  '.cts',
  '.mts',
  '.tsx',
  '.ctsx',
  '.mtsx',
  '.d.ts',
] as const);
export const webSuffix = '.web';
const platformSuffixes = new Set([
  '.android',
  '.ios',
  webSuffix,
  '.native',
] as const);

export const commonExtensions = new Set([...tsExtensions, ...jsExtensions]);

export const platformSpecificExtensions = new Set(
  [...commonExtensions].flatMap(extension =>
    [...platformSuffixes].map(suffix => `${suffix}${extension}` as const),
  ),
);

const testSuffix = '.test';

export const testExtensions = new Set(
  [...commonExtensions].map(_ => `${testSuffix}${_}` as const),
);

export const extensions = new Set([
  ...platformSpecificExtensions,
  ...testExtensions,
  ...commonExtensions,
]);
