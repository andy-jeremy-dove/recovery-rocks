import {useMemo} from 'react';
import {StyleSheet, TextProps, View, ViewStyle} from 'react-native';

import CardList from './CardList';
import {MeetingCard} from './MeetingCard';
import ThemeGroup from './ThemeGroup';
import BackgroundView from '../../components/BackgroundView';
import BasicButtonText from '../../components/BasicButtonText';
import ContentScrollView from '../../components/ContentScrollView';
import DatePillText from '../../components/DatePillText';
import {OptionalObservable, useObservable} from '../../structure';
import {fillSpace} from '../../styles';

export type PromptSettingsScreenProps = {
  $today: OptionalObservable<string>;
  $doesObeySystem?: OptionalObservable<boolean | undefined>;
  toggleSystemObedience?: () => void;
  onSetupPress?: () => void;
  $cards: OptionalObservable<MeetingCard[] | null | undefined>;
  onCardPress?: (id: string) => void;
  compensateHeaderHeight?: number;
};

export default function PromptSettingsScreen(props: PromptSettingsScreenProps) {
  const {
    $today,
    $doesObeySystem,
    toggleSystemObedience,
    onSetupPress,
    $cards,
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
      <TodayText style={layoutStyles.center} $today={$today} />
      <View style={layoutStyles.grow1} />
      <ThemeGroup
        style={layoutStyles.indent}
        $doesObeySystem={$doesObeySystem}
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
        $cards={$cards}
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
  $today: OptionalObservable<string>;
};

function TodayText(props: TodayTextProps) {
  const {$today, ...rest} = props;
  const today = useObservable($today);
  return <DatePillText {...rest}>{today}</DatePillText>;
}
