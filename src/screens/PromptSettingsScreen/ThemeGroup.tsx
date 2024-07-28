import {observer} from 'mobx-react-lite';
import {useCallback} from 'react';
import type {ViewProps} from 'react-native';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import LinkText from '../../components/LinkText';
import type {OptionalGetter} from '../../mobx-toolbox';
import {use} from '../../mobx-toolbox';
import {ThemeProvider, variance} from '../../styling';
import type {ThemeId, ThemeItem, ThemeItems} from './PromptSettingsScreen';

export type ThemeGroupProps = ViewProps & {
  getDoesObeySystem?: OptionalGetter<boolean | undefined>;
  toggleSystemObedience?: () => void;
  $themeItems?: OptionalGetter<ThemeItems>;
  onThemeItemPress?: (_: ThemeId) => void;
};

export default observer(function ThemeGroup(props: ThemeGroupProps) {
  const {
    getDoesObeySystem,
    toggleSystemObedience,
    $themeItems,
    onThemeItemPress,
    style,
    ...rest
  } = props;
  return (
    <View style={[layoutStyles.themeGroup, style]} {...rest}>
      <SystemObedience
        getDoesObeySystem={getDoesObeySystem}
        toggleSystemObedience={toggleSystemObedience}
      />
      <ThemeItemsPicker
        $themeItems={$themeItems}
        onThemeItemPress={onThemeItemPress}
      />
    </View>
  );
});

type SystemObedienceProps = {
  getDoesObeySystem?: OptionalGetter<boolean | undefined>;
  toggleSystemObedience?: () => void;
};

const SystemObedience = observer(function SystemObedience(
  props: SystemObedienceProps,
) {
  const {getDoesObeySystem, toggleSystemObedience} = props;
  const doesObeySystem = use(getDoesObeySystem);
  return (
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
  );
});

type ThemeItemsPickerProps = {
  $themeItems?: OptionalGetter<ThemeItems>;
  onThemeItemPress?: (_: ThemeId) => void;
};

const ThemeItemsPicker = observer(function ThemeItemsPicker(
  props: ThemeItemsPickerProps,
) {
  const {$themeItems, onThemeItemPress} = props;
  const themeItems = use($themeItems);
  return (
    <View style={layoutStyles.themeRow}>
      {themeItems?.map(_ => (
        <ThemeItemView
          key={_.id}
          item={_}
          onThemeItemPress={onThemeItemPress}
        />
      ))}
    </View>
  );
});

type ThemeItemViewProps = {
  onThemeItemPress?: (_: ThemeId) => void;
  item: ThemeItem;
} & ViewProps;

const ThemeItemView = observer(function ThemeItemView(
  props: ThemeItemViewProps,
) {
  const {onThemeItemPress, item, ...rest} = props;
  const {id} = item;
  const onPress = useCallback(() => {
    onThemeItemPress?.(id);
  }, [id, onThemeItemPress]);
  return (
    <Pressable onPress={onPress}>
      <View {...rest}>
        {item.selected && <ThemeSelection />}
        <ThemeProvider theme={item.theme}>
          <ThemeButton>{item.title}</ThemeButton>
        </ThemeProvider>
      </View>
    </Pressable>
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
