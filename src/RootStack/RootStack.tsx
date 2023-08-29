import {createStackNavigator, StackNavigationOptions, StackScreenProps} from "@react-navigation/stack";
import {ShowProgressBinding} from "../bindings/ShowProgressBinding";
import {PromptSetupBinding} from "../bindings/PromptSetupBinding";
import {TransitionPresets} from '@react-navigation/stack';
import {PlatformPressable} from '@react-navigation/elements';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet} from "react-native";

export type RootStackParamList = {
  PromptSetup: undefined;
  ShowProgress: undefined;
};

export function RootStack() {
  return (
    <Navigator id="root" initialRouteName="ShowProgress" screenOptions={commonOptions}>
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

function showProgressOptions ({navigation}: StackScreenProps<RootStackParamList, 'ShowProgress'>): StackNavigationOptions {
  return {
    title: 'Прогресс',
    headerShown: true,
    headerRight: (props) => (
      <PlatformPressable
        onPress={() => navigation.navigate('PromptSetup')}
        pressColor={props.pressColor}
        pressOpacity={props.pressOpacity}
      >
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
    marginVertical: 6,
    marginHorizontal: 14,
  },
});

const promptSetupOptions: StackNavigationOptions = {
  title: 'Установка',
  presentation: 'modal',
};

const {Screen, Navigator} = createStackNavigator<RootStackParamList>();
