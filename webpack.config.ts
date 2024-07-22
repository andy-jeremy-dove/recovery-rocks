import createExpoWebpackConfigAsync from '@expo/webpack-config/webpack';
import type {Arguments, Environment} from '@expo/webpack-config/webpack/types';

export default async function getConfig(env: Environment, argv: Arguments) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.module?.rules?.forEach(rule => {
    if (typeof rule === 'object' && rule?.oneOf) {
      rule.oneOf.unshift({
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              inlineStyles: {
                onlyMatchedOnce: false,
              },
              viewBox: false,
              removeUnknownsAndDefaults: false,
              convertColors: false,
            },
          },
        ],
      });
    }
  });

  config.resolve = {
    ...config.resolve,
    fallback: {
      crypto: require.resolve('expo-crypto'),
      ...config.resolve?.fallback,
    },
  };

  return config;
}
