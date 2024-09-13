import type {ExpoConfig} from 'expo/config';

export default {
  name: 'Recovery Rocks',
  slug: 'RecoveryRocks',
  scheme: 'recoveryrocks',
  version: '1.0.0',
  icon: './assets/rr-logo.png',
  userInterfaceStyle: 'light',
  plugins: ['expo-font'],
  splash: {
    image: './assets/rr-logo.png',
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
      foregroundImage: './assets/rr-logo.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/rr-logo.png',
  },
} satisfies ExpoConfig;
