import { ComponentType, useMemo } from "react";
import { View, Text, ViewStyle } from "react-native";

import { DailyAchievement } from "../RecoveryRocks/computeDailyAchievement";
import { MemorableDate } from "../RecoveryRocks/detectAnniversary";
import { ContentScrollView } from "../components/ContentScrollView";
import { variance } from "../styling";

export type ShowProgressScreenProps = {
  today: string;
  ProgressFallback: ComponentType;
  progressInfo?: ProgressInfo | null;
  quote?: string;
  onQuotePress?: () => void;
  compensateHeaderHeight?: number;
};

export type ProgressInfo = {
  announcement: string;
  achievement: Achievement;
};

export type Achievement = DailyAchievement | AnniversaryAchievement;

export type AnniversaryAchievement = {
  previous?: MemorableDate;
  today: MemorableDate;
  next?: MemorableDate;
};

export function ShowProgressScreen(props: ShowProgressScreenProps) {
  const {
    today,
    ProgressFallback,
    progressInfo,
    quote,
    onQuotePress,
    compensateHeaderHeight,
  } = props;
  const topStyle: ViewStyle = useMemo(
    () => ({
      minHeight: compensateHeaderHeight ?? 0,
      flexBasis: compensateHeaderHeight ?? 0,
      flexShrink: 0,
      flexGrow: 0,
    }),
    [compensateHeaderHeight],
  );
  const topIsCompensated = compensateHeaderHeight !== undefined;
  return (
    <ContentScrollView topIsCompensated={topIsCompensated}>
      <View style={topStyle} />
      <Today>{today}</Today>
      {progressInfo === null ? (
        <ProgressFallback />
      ) : progressInfo !== undefined ? (
        <Announcement>{progressInfo.announcement}</Announcement>
      ) : null}
      <Announcement onPress={onQuotePress}>{quote}</Announcement>
    </ContentScrollView>
  );
}

const LINE_HEIGHT = 21;
const PADDING = 4;
const BORDER_RADIUS = (LINE_HEIGHT + PADDING * 2) / 2;

const Today = variance(Text)((theme) => ({
  root: {
    alignSelf: "center",
    overflow: "hidden",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: BORDER_RADIUS,
    textAlign: "center",
    backgroundColor: theme.palette.backgroundAccent,
    ...theme.fontByWeight("400"),
    color: theme.palette.textAccent,
    fontSize: 17,
    lineHeight: 21,
  },
}));

const Announcement = variance(Text)((theme) => ({
  root: {
    textAlign: "center",
    ...theme.fontByWeight("400"),
    color: theme.palette.textPrimary,
    fontSize: 20,
    lineHeight: 26,
  },
}));
