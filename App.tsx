import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Inter_400Regular,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import {
  DocumentTitleOptions,
  LinkingOptions,
} from "@react-navigation/native/lib/typescript/src/types";
import dayjs from "dayjs";
import { createURL } from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import "dayjs/locale/ru";

import app from "./app.json";
import RootStack from "./src/RootStack/RootStack";
import { RootStackParamList } from "./src/RootStack/RootStackParamList";
import {
  lightPalette,
  ThemeImpl,
  ThemeProvider,
  useTheme,
} from "./src/styling";

dayjs.locale("ru");

export default function App() {
  const [isLoaded] = useFonts({
    Inter_400Regular,
    Inter_800ExtraBold,
    ...Ionicons.font,
  });
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

const globalTheme = new ThemeImpl(false, lightPalette);

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
      linking={linking}
    >
      <RootStack />
    </NavigationContainer>
  );
}

const linking: LinkingOptions<RootStackParamList> = {
  enabled: true,
  prefixes: [
    createURL("/"),
    `${app.expo.scheme}://`,
    ...(__DEV__ ? ["http://localhost:3000", "http://localhost:19006"] : []),
  ],
  config: {
    initialRouteName: "ShowProgress",
    screens: {
      ShowProgress: "",
      PromptSetup: "setup",
    },
  },
};

const documentTitle: DocumentTitleOptions = {
  enabled: true,
  formatter: (options) => {
    if (options?.title) {
      return `${options.title} @ ${app.expo.name}`;
    }
    return app.expo.name;
  },
};

function GlobalStatusBar() {
  const theme = useTheme();
  return (
    <StatusBar
      translucent
      backgroundColor={theme.palette.background}
      animated
      hideTransitionAnimation="slide"
      networkActivityIndicatorVisible
      style={theme.isDark ? "light" : "dark"}
    />
  );
}
