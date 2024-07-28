import type {Config} from 'jest';
import {join} from 'path';

export default {
  preset: join(require.resolve('jest-expo'), '../..'),
  transformIgnorePatterns: [
    'node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg))',
  ],
  prettierPath: null, // https://github.com/jestjs/jest/issues/14305
} satisfies Config;
