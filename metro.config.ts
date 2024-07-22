import {getDefaultConfig} from 'expo/metro-config';
import type {MetroConfig} from 'metro';

const config = getDefaultConfig(__dirname);

export default {
  ...config,
  transformer: {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...config.resolver,
    assetExts: config.resolver?.assetExts?.filter(ext => ext !== 'svg'),
    sourceExts: [...(config.resolver?.sourceExts ?? []), 'svg'],
  },
} satisfies MetroConfig;
