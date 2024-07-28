import {Inter_400Regular, Inter_800ExtraBold} from '@expo-google-fonts/inter';
import {
  SourceSerifPro_400Regular,
  SourceSerifPro_400Regular_Italic,
} from '@expo-google-fonts/source-serif-pro';
import {Ionicons} from '@expo/vector-icons';
import type {Theme} from '@react-navigation/native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import type {
  DocumentTitleOptions,
  LinkingOptions,
} from '@react-navigation/native/lib/typescript/src/types';
import chroma from 'chroma-js';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'disposablestack/auto';
import {useFonts} from 'expo-font';
import {createURL} from 'expo-linking';
import {
  setBackgroundColorAsync,
  setBehaviorAsync,
  setBorderColorAsync,
  setButtonStyleAsync,
  setPositionAsync,
  setVisibilityAsync,
} from 'expo-navigation-bar';
import {StatusBar} from 'expo-status-bar';
import {observer} from 'mobx-react-lite';
import {useEffect, useMemo} from 'react';
import {Platform} from 'react-native';
import 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import app from './app.config';
import './global.css';
import {useRoot} from './src/Root';
import RootProvider from './src/Root/RootProvider';
import RootStack from './src/RootStack/RootStack';
import type {RootStackParamList} from './src/RootStack/RootStackParamList';
import {ThemeProvider, useTheme} from './src/styling';

dayjs.locale('ru');

export default function App() {
  return (
    <RootProvider>
      <AppRoot />
    </RootProvider>
  );
}

const AppRoot = observer(function AppRoot() {
  const [isLoaded] = useFonts({
    Inter_400Regular,
    Inter_800ExtraBold,
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    ...Ionicons.font,
  });
  useEffect(() => {
    if (Platform.OS === 'android') {
      void Promise.all([
        setBehaviorAsync('inset-touch'),
        setPositionAsync('absolute'),
        setVisibilityAsync('visible'),
      ]);
    }
  }, []);
  const root = useRoot();
  if (!isLoaded || !root.themeState.initialized) {
    return null;
  }
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider theme={root.themeState.theme}>
        <GlobalStatusBar />
        <NavigationRoot />
      </ThemeProvider>
    </SafeAreaProvider>
  );
});

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
      return `${String(options.title)} | ${app.name}`;
    }
    return app.name;
  },
};

function GlobalStatusBar() {
  const theme = useTheme();
  useEffect(() => {
    if (Platform.OS === 'android') {
      const background = chroma(theme.palette.background).alpha(0).hex('rgba');
      void Promise.all([
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
