import type {Linter} from 'eslint';

import {
  commonExtensions,
  extensions,
  tsExtensions,
  webSuffix,
} from './util/extensions';

const project = ['./tsconfig.eslint.json', './tsconfig.json'] as const;

export default {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-warning-comments': 'warn',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-this-alias': ['error', {allowedNames: ['that']}],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowAny: false,
        allowBoolean: false,
        allowNullish: false,
        allowNumber: true,
        allowRegExp: false,
        allowNever: false,
      },
    ],
    '@typescript-eslint/class-methods-use-this': [
      'error',
      {
        ignoreOverrideMethods: true,
        ignoreClassesThatImplementAnInterface: true,
      },
    ],
    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['warn', 'in-try-catch'],
    'import/no-deprecated': 'warn',
    'import/no-empty-named-blocks': 'warn',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        includeInternal: true,
        includeTypes: true,
      },
    ],
    'no-func-assign': 'warn',
    'no-class-assign': 'warn',
    'import/no-mutable-exports': 'warn',
    'import/no-named-as-default': 'warn',
    'import/no-unused-modules': 'off', // this rule cannot be configured in a meaningful way
    'import/no-cycle': ['error', {ignoreExternal: true}],
    'import/no-relative-packages': 'warn',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': ['warn', {noUselessIndex: true}],
    'import/no-webpack-loader-syntax': 'warn',
    'import/prefer-default-export': ['warn', {target: 'single'}],
    // rules below are stylistic and may conflict with Prettier
    '@typescript-eslint/consistent-type-exports': [
      'warn',
      {fixMixedExportsWithInlineTypeSpecifier: false},
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
        fixStyle: 'separate-type-imports',
      },
    ],
    'import/no-anonymous-default-export': [
      'warn',
      {
        allowArray: true,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true,
        allowNew: true,
        allowLiteral: true,
        allowObject: true,
      },
    ],
    'import/no-duplicates': 'warn',
    'import/no-namespace': 'warn',
  },
  settings: {
    'import/extensions': [...extensions],
    'import/parsers': {
      '@typescript-eslint/parser': [...tsExtensions],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project,
      },
      node: {extensions: [...extensions]},
    },
  },
  overrides: [
    {
      files: `**/*${webSuffix}{${[...commonExtensions].join(',')}}`,
      env: {browser: true},
    },
    {
      files: `**/index{${[...extensions].join(',')}}`,
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
  ignorePatterns: ['**/*.json', '**/.expo', '**/node_modules', '/*.js'],
} satisfies Linter.Config;
