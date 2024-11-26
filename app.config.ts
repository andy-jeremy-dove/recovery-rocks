import type {ExpoConfig} from 'expo/config';

export default {
  name: 'Recovery Rocks',
  slug: 'RecoveryRocks',
  scheme: 'recoveryrocks',
  version: '1.0.0',
  // https://github.com/expo/expo-cli/issues/2441
  icon: './web/rr-logo.png',
  userInterfaceStyle: 'light',
  plugins: ['expo-font'],
  splash: {
    image: './web/rr-logo.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  androidStatusBar: {
    translucent: true,
  },
  androidNavigationBar: {
    visible: 'leanback',
    backgroundColor: 'transparent',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './web/rr-logo.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './web/rr-logo.png',
  },
} satisfies ExpoConfig;
