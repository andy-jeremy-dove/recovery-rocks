import 'disposablestack/auto';
import 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';
import {Inter_400Regular, Inter_800ExtraBold} from '@expo-google-fonts/inter';
import {
  SourceSerifPro_400Regular,
  SourceSerifPro_400Regular_Italic,
} from '@expo-google-fonts/source-serif-pro';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {
  DocumentTitleOptions,
  LinkingOptions,
} from '@react-navigation/native/lib/typescript/src/types';
import chroma from 'chroma-js';
import dayjs from 'dayjs';
import {useFonts} from 'expo-font';
import {createURL} from 'expo-linking';
import {
  setBehaviorAsync,
  setPositionAsync,
  setButtonStyleAsync,
  setBackgroundColorAsync,
  setBorderColorAsync,
  setVisibilityAsync,
} from 'expo-navigation-bar';
import {StatusBar} from 'expo-status-bar';
import {useEffect, useMemo} from 'react';
import {Platform} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import 'dayjs/locale/ru';

import app from './app.config';
import RootStack from './src/RootStack/RootStack';
import {RootStackParamList} from './src/RootStack/RootStackParamList';
import {ThemeProvider, useTheme} from './src/styling';
import classicTheme from './src/styling/Theme/classicTheme';

dayjs.locale('ru');

export default function App() {
  const [isLoaded] = useFonts({
    Inter_400Regular,
    Inter_800ExtraBold,
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    ...Ionicons.font,
  });
  useEffect(() => {
    if (Platform.OS === 'android') {
      // noinspection JSIgnoredPromiseFromCall
      Promise.all([
        setBehaviorAsync('inset-touch'),
        setPositionAsync('absolute'),
        setVisibilityAsync('visible'),
      ]);
    }
  }, []);
  if (!isLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider theme={globalTheme}>
        <GlobalStatusBar />
        <NavigationRoot />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const globalTheme = classicTheme;

function NavigationRoot() {
  const theme = useTheme();
  const navigationTheme: Theme = useMemo(() => {
    const base = theme.isDark ? DarkTheme : DefaultTheme;
    return {
      ...base,
      dark: theme.isDark,
      colors: {
        ...base.colors,
        background: theme.palette.background,
        card: theme.palette.background,
        border: theme.palette.borderPrimary,
        text: theme.palette.textSecondary,
        primary: theme.palette.textSecondary,
        notification: theme.palette.backgroundAccent,
      },
    };
  }, [theme]);
  return (
    <NavigationContainer
      documentTitle={documentTitle}
      theme={navigationTheme}
      linking={linking}>
      <RootStack />
    </NavigationContainer>
  );
}

const linking: LinkingOptions<RootStackParamList> = {
  enabled: true,
  prefixes: [
    createURL('/'),
    `${app.scheme}://`,
    ...(__DEV__ ? ['http://localhost:3000', 'http://localhost:19006'] : []),
  ],
  config: {
    initialRouteName: 'ShowProgress',
    screens: {
      ShowProgress: '',
      PromptSetup: 'setup',
      PromptSettings: 'settings',
      ShowTopic: 'topic',
      ShowMeetingCard: 'card/:id',
    },
  },
};

const documentTitle: DocumentTitleOptions = {
  enabled: true,
  formatter: options => {
    if (options?.title) {
      return `${options.title} | ${app.name}`;
    }
    return app.name;
  },
};

function GlobalStatusBar() {
  const theme = useTheme();
  useEffect(() => {
    if (Platform.OS === 'android') {
      const background = chroma(theme.palette.background).alpha(0).hex('rgba');
      // noinspection JSIgnoredPromiseFromCall
      Promise.all([
        Platform.Version >= 28 && setBorderColorAsync(background),
        setBackgroundColorAsync(background),
        setButtonStyleAsync(theme.isDark ? 'light' : 'dark'),
      ]);
    }
  }, [theme]);
  return (
    <StatusBar
      translucent
      animated
      hideTransitionAnimation="slide"
      networkActivityIndicatorVisible
      style={theme.isDark ? 'light' : 'dark'}
    />
  );
}
