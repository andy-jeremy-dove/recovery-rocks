import {ExpoConfig} from 'expo/config';

const config: ExpoConfig = {
  name: 'RecoveryRocks',
  slug: 'RecoveryRocks',
  scheme: 'recoveryrocks',
  version: '1.0.0',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  plugins: ['expo-font'],
  splash: {
    image: './assets/splash.png',
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
    backgroundColor: '#ffffff00',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
};

export default config;
