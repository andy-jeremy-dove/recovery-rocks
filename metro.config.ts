// Learn more https://docs.expo.io/guides/customizing-metro
import {getDefaultConfig} from 'expo/metro-config';

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const {transformer, resolver} = config;

  const _transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  const _resolver = {
    ...resolver,
    assetExts: resolver?.assetExts?.filter(ext => ext !== 'svg'),
    sourceExts: [...(resolver?.sourceExts ?? []), 'svg'],
  };

  return {...config, transformer: _transformer, resolver: _resolver};
})();
