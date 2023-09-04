import {Ionicons} from '@expo/vector-icons';
import {PlatformPressable} from '@react-navigation/elements';
import {useTheme} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackScreenProps,
  TransitionPresets,
} from '@react-navigation/stack';
import {useMemo} from 'react';
import {Platform, StyleSheet} from 'react-native';

import {RootStackParamList} from './RootStackParamList';
import PromptSetupBinding from '../bindings/PromptSetupBinding';
import ShowProgressBinding from '../bindings/ShowProgressBinding';

export default function RootStack() {
  const theme = useTheme();
  const options = useMemo<StackNavigationOptions>(() => {
    const tintColor = Platform.select({
      ios: theme.colors.primary,
      default: theme.colors.text,
    });
    const pressColor = theme.dark
      ? 'rgba(255, 255, 255, .32)'
      : 'rgba(0, 0, 0, .32)';
    return {
      ...commonOptions,
      headerTintColor: tintColor,
      headerPressColor: pressColor,
      headerPressOpacity: 0.3,
    };
  }, [theme]);

  return (
    <Navigator
      id="root"
      initialRouteName="ShowProgress"
      screenOptions={options}>
      <Screen
        name="ShowProgress"
        component={ShowProgressBinding}
        options={showProgressOptions}
      />
      <Screen
        name="PromptSetup"
        component={PromptSetupBinding}
        options={promptSetupOptions}
      />
    </Navigator>
  );
}

const commonOptions: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerTransparent: true,
  headerMode: 'float',
  headerTitle: '',
  ...TransitionPresets.DefaultTransition,
};

function showProgressOptions({
  navigation,
}: StackScreenProps<
  RootStackParamList,
  'ShowProgress'
>): StackNavigationOptions {
  return {
    title: 'Прогресс',
    headerShown: true,
    headerRight: props => (
      <PlatformPressable
        onPress={() => navigation.navigate('PromptSetup')}
        pressColor={props.pressColor}
        pressOpacity={props.pressOpacity}>
        <Ionicons
          name="settings-outline"
          size={24}
          color={props.tintColor}
          style={styles.settingsIcon}
        />
      </PlatformPressable>
    ),
  };
}

const styles = StyleSheet.create({
  settingsIcon: {
    marginHorizontal: 14,
  },
});

const promptSetupOptions: StackNavigationOptions = {
  title: 'Установка',
  presentation: 'modal',
};

const {Screen, Navigator} = createStackNavigator<RootStackParamList>();
