import {Ionicons} from '@expo/vector-icons';
import {PlatformPressable} from '@react-navigation/elements';
import {useTheme as useNavigationTheme} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackScreenProps,
  TransitionPresets,
} from '@react-navigation/stack';
import {useCallback, useMemo} from 'react';
import {Platform, StyleSheet} from 'react-native';

import {RootStackParamList} from './RootStackParamList';
import PromptSettingsBinding from '../bindings/PromptSettingsBinding';
import PromptSetupBinding from '../bindings/PromptSetupBinding';
import ShowMeetingCardBinding from '../bindings/ShowMeetingCardBinding';
import ShowProgressBinding from '../bindings/ShowProgressBinding';
import ShowTopicBinding from '../bindings/ShowTopicBinding';

export default function RootStack() {
  const theme = useNavigationTheme();
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
  const showMeetingCardOptions = useShowMeetingCardOptions();

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
      <Screen
        name="PromptSettings"
        component={PromptSettingsBinding}
        options={promptSettingsOptions}
      />
      <Screen
        name="ShowTopic"
        component={ShowTopicBinding}
        options={showTopicOptions}
      />
      <Screen
        name="ShowMeetingCard"
        component={ShowMeetingCardBinding}
        options={showMeetingCardOptions}
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

function showProgressOptions(
  props: StackScreenProps<RootStackParamList, 'ShowProgress'>,
): StackNavigationOptions {
  return {
    ...withSettingsButton(props),
    title: 'Прогресс',
  };
}

function showTopicOptions(
  props: StackScreenProps<RootStackParamList, 'ShowTopic'>,
): StackNavigationOptions {
  return {
    ...withSettingsButton(props),
    title: 'Тема для размышлений',
  };
}

function useShowMeetingCardOptions() {
  return useCallback(
    (
      props: StackScreenProps<RootStackParamList, 'ShowMeetingCard'>,
    ): StackNavigationOptions => ({
      ...withSettingsButton(props),
      title: 'Карточка собрания',
      headerTintColor: '#fff',
      headerPressColor: 'rgba(255, 255, 255, .32)',
      headerBackgroundContainerStyle: {
        backgroundColor: '#00000033',
      },
    }),
    [],
  );
}

function withSettingsButton(
  props: StackScreenProps<RootStackParamList>,
): StackNavigationOptions {
  const {navigation} = props;
  return {
    headerShown: true,
    headerRight: _props => {
      const {pressColor, pressOpacity, tintColor} = _props;
      return (
        <PlatformPressable
          onPress={() => navigation.navigate('PromptSettings')}
          pressColor={pressColor}
          pressOpacity={pressOpacity}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={tintColor}
            style={styles.settingsIcon}
          />
        </PlatformPressable>
      );
    },
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

const promptSettingsOptions: StackNavigationOptions = {
  title: 'Настройки',
  presentation: 'modal',
};

const {Screen, Navigator} = createStackNavigator<RootStackParamList>();
