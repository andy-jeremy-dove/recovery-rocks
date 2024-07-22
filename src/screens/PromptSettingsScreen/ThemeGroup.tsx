import {observer} from 'mobx-react-lite';
import type {ViewProps} from 'react-native';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import LinkText from '../../components/LinkText';
import type {OptionalGetter} from '../../mobx-toolbox';
import {use} from '../../mobx-toolbox';
import {ThemeProvider, variance} from '../../styling';
import classicTheme from '../../styling/Theme/classicTheme';
import darkTheme from '../../styling/Theme/darkTheme';
import lightTheme from '../../styling/Theme/lightTheme';

export type ThemeGroupProps = ViewProps & {
  getDoesObeySystem?: OptionalGetter<boolean | undefined>;
  toggleSystemObedience?: () => void;
};

export default observer(function ThemeGroup(props: ThemeGroupProps) {
  const {getDoesObeySystem, toggleSystemObedience, style, ...rest} = props;
  const doesObeySystem = use(getDoesObeySystem);
  return (
    <View style={[layoutStyles.themeGroup, style]} {...rest}>
      <Pressable onPress={toggleSystemObedience}>
        {({focused, hovered, pressed}) => (
          <ThemePreferenceText>
            {doesObeySystem
              ? 'Тема выставляется автоматически, исходя из системных настроек.'
              : 'Тема выставляется вручную.'}{' '}
            <LinkText hover={focused || hovered} active={pressed}>
              {doesObeySystem
                ? 'Выставить вручную.'
                : 'Выставлять согласно системе.'}
            </LinkText>
          </ThemePreferenceText>
        )}
      </Pressable>
      <View style={layoutStyles.themeRow}>
        <View>
          <ThemeSelection />
          <ThemeProvider theme={lightTheme}>
            <ThemeButton>Светлая</ThemeButton>
          </ThemeProvider>
        </View>
        <View>
          <ThemeSelection />
          <ThemeProvider theme={classicTheme}>
            <ThemeButton>Классика</ThemeButton>
          </ThemeProvider>
        </View>
        <View>
          <ThemeSelection />
          <ThemeProvider theme={darkTheme}>
            <ThemeButton>Тёмная</ThemeButton>
          </ThemeProvider>
        </View>
      </View>
    </View>
  );
});

const THEME_SELECTION_WIDTH = 8;

const layoutStyles = StyleSheet.create({
  themeGroup: {
    gap: 16,
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: THEME_SELECTION_WIDTH * 2 + 2,
    flexWrap: 'wrap',
  },
});

const ThemePreferenceText = variance(Text)(theme => ({
  root: {
    textAlign: 'center',
    ...theme.fontByWeight('400'),
    color: theme.palette.textPrimary,
    fontSize: 20,
    lineHeight: 26,
  },
}));

const THEME_BUTTON_BORDER_RADIUS = 12;

const ThemeButton = variance(Text)(theme => ({
  root: {
    textAlign: 'center',
    overflow: 'hidden',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: THEME_BUTTON_BORDER_RADIUS,
    borderColor: theme.palette.borderPrimary,
    backgroundColor: theme.palette.background,
    ...theme.fontByWeight('400'),
    color: theme.palette.textPrimary,
    fontSize: 18,
    lineHeight: 24,
  },
}));

const THEME_SELECTION_BORDER_RADIUS =
  THEME_BUTTON_BORDER_RADIUS + THEME_SELECTION_WIDTH;

const ThemeSelection = variance(View)(theme => ({
  root: {
    position: 'absolute',
    left: -THEME_SELECTION_WIDTH,
    right: -THEME_SELECTION_WIDTH,
    top: -THEME_SELECTION_WIDTH,
    bottom: -THEME_SELECTION_WIDTH,
    borderRadius: THEME_SELECTION_BORDER_RADIUS,
    backgroundColor: theme.palette.backgroundAccent,
  },
}));
