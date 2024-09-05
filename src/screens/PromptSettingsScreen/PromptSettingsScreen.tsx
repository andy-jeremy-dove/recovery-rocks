import {observer} from 'mobx-react-lite';
import {useMemo} from 'react';
import type {TextProps, ViewStyle} from 'react-native';
import {StyleSheet, View} from 'react-native';

import BackgroundView from '../../components/BackgroundView';
import BasicButtonText from '../../components/BasicButtonText';
import ContentScrollView from '../../components/ContentScrollView';
import DatePillText from '../../components/DatePillText';
import type {OptionalGetter} from '../../mobx-toolbox';
import {use} from '../../mobx-toolbox';
import type {Tagged} from '../../Opaque';
import type {_Array, _Object} from '../../Paramut';
import {fillSpace} from '../../styles';
import type {Theme} from '../../styling';
import CardList from './CardList';
import type {MeetingCard} from './MeetingCard';
import ThemeGroup from './ThemeGroup';

export type PromptSettingsScreenProps = {
  getToday: OptionalGetter<string>;
  getDoesObeySystem?: OptionalGetter<boolean | undefined>;
  toggleSystemObedience?: () => void;
  $themeItems?: OptionalGetter<ThemeItems>;
  onThemeItemPress?: (_: ThemeId) => void;
  onSetupPress?: () => void;
  getCards: OptionalGetter<_Array<MeetingCard> | null | undefined>;
  onCardPress?: (id: string) => void;
  compensateHeaderHeight?: number;
};

declare const THEME_ID_TAG: unique symbol;
export type ThemeIdTag = typeof THEME_ID_TAG;
export type ThemeId = Tagged<number, ThemeIdTag>;

export type ThemeItem<Mut extends boolean = false> = _Object<
  {
    id: ThemeId;
    title: string;
    selected: boolean;
    theme: Theme;
  },
  Mut
>;

export type ThemeItems<Mut extends boolean = false> = _Array<
  ThemeItem<Mut>,
  Mut
>;

export default function PromptSettingsScreen(props: PromptSettingsScreenProps) {
  const {
    getToday,
    getDoesObeySystem,
    toggleSystemObedience,
    $themeItems,
    onThemeItemPress,
    onSetupPress,
    getCards,
    onCardPress,
    compensateHeaderHeight,
  } = props;
  const contentContainerStyle: ViewStyle = useMemo(
    () => ({paddingTop: compensateHeaderHeight ?? 0}),
    [compensateHeaderHeight],
  );
  const topIsCompensated = compensateHeaderHeight !== undefined;
  return (
    <ContentScrollView
      contentContainerStyle={contentContainerStyle}
      topIsCompensated={topIsCompensated}>
      <BackgroundView />
      <TodayText style={layoutStyles.center} getToday={getToday} />
      <View style={layoutStyles.grow1} />
      <ThemeGroup
        style={layoutStyles.indent}
        getDoesObeySystem={getDoesObeySystem}
        toggleSystemObedience={toggleSystemObedience}
        $themeItems={$themeItems}
        onThemeItemPress={onThemeItemPress}
      />
      <View style={layoutStyles.grow1} />
      <BasicButtonText
        style={[layoutStyles.center, layoutStyles.indent]}
        onPress={onSetupPress}>
        Переустановить счётчик
      </BasicButtonText>
      <View style={layoutStyles.grow1} />
      <CardList
        style={layoutStyles.indent}
        getCards={getCards}
        onCardPress={onCardPress}
      />
      <View style={layoutStyles.grow1} />
    </ContentScrollView>
  );
}

const layoutStyles = StyleSheet.create({
  center: {
    alignSelf: 'center',
  },
  indent: {
    margin: 16,
  },
  grow1: fillSpace(1),
});

type TodayTextProps = TextProps & {
  getToday: OptionalGetter<string>;
};

const TodayText = observer(function TodayText(props: TodayTextProps) {
  const {getToday, ...rest} = props;
  const today = use(getToday);
  return <DatePillText {...rest}>{today}</DatePillText>;
});
