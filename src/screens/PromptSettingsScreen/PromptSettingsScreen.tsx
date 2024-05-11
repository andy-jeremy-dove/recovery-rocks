import {observer} from 'mobx-react-lite';
import {useMemo} from 'react';
import {StyleSheet, TextProps, View, ViewStyle} from 'react-native';

import CardList from './CardList';
import {MeetingCard} from './MeetingCard';
import ThemeGroup from './ThemeGroup';
import BackgroundView from '../../components/BackgroundView';
import BasicButtonText from '../../components/BasicButtonText';
import ContentScrollView from '../../components/ContentScrollView';
import DatePillText from '../../components/DatePillText';
import {OptionalGetter, use} from '../../mobx-toolbox';
import {fillSpace} from '../../styles';

export type PromptSettingsScreenProps = {
  getToday: OptionalGetter<string>;
  getDoesObeySystem?: OptionalGetter<boolean | undefined>;
  toggleSystemObedience?: () => void;
  onSetupPress?: () => void;
  getCards: OptionalGetter<MeetingCard[] | null | undefined>;
  onCardPress?: (id: string) => void;
  compensateHeaderHeight?: number;
};

export default function PromptSettingsScreen(props: PromptSettingsScreenProps) {
  const {
    getToday,
    getDoesObeySystem,
    toggleSystemObedience,
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
