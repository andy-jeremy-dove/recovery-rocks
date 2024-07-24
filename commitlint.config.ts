import base from '@commitlint/config-conventional';
import type {UserConfig} from '@commitlint/types';
import {RuleConfigSeverity} from '@commitlint/types';

const baseCommitTypes = base.rules['type-enum'][2];
const extendedCommitTypes = new Set([...baseCommitTypes, 'feature']);
const commitTypes = [
  ...extendedCommitTypes,
  ...[...extendedCommitTypes].map(pascalCase),
];

const s = RuleConfigSeverity;

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-full-stop': [s.Error, 'always', '.'],
    'body-case': [s.Error, 'always', ['lower-case', 'sentence-case']],
    'header-case': [s.Error, 'always', ['lower-case', 'sentence-case']],
    'scope-enum': [s.Error, 'always', ['android', 'ios', 'native', 'web']],
    'scope-case': [s.Error, 'always', 'lower-case'],
    'subject-case': [
      s.Error,
      'always',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'type-enum': [s.Error, 'always', commitTypes],
    'type-case': [
      s.Error,
      'always',
      ['lower-case', 'pascal-case', 'upper-case'],
    ],
    'signed-off-by': [s.Disabled],
    'trailer-exists': [s.Disabled],
  },
} satisfies UserConfig;

function pascalCase(_: string): string {
  const first = _.slice(0, 1).toUpperCase();
  const rest = _.slice(1);
  return `${first}${rest}`;
}
