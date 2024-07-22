import type {ConfigAPI, TransformOptions} from '@babel/core';
import babelPresetExpo from 'babel-preset-expo';

export default function getConfig(api: ConfigAPI): TransformOptions {
  api.cache.forever();
  return {
    presets: [babelPresetExpo],
    plugins: [
      [
        require.resolve('@babel/plugin-proposal-decorators'),
        {version: '2023-05'},
      ],
      require.resolve('@babel/plugin-proposal-explicit-resource-management'),
    ],
    assumptions: {
      setPublicClassFields: false,
    },
  };
}
