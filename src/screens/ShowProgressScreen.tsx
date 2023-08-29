import { ComponentType, useMemo } from "react";
import { View, Text, ViewStyle, RefreshControl } from "react-native";

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
      flexBasis: compensateHeaderHeight ?? 0,
      flexShrink: 0,
      flexGrow: 0,
    }),
    [compensateHeaderHeight],
  );
  const topIsCompensated = compensateHeaderHeight !== undefined;
  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={progressInfo === undefined || quote === undefined}
      />
    ),
    [progressInfo, quote],
  );
  return (
    <ContentScrollView
      refreshControl={refreshControl}
      topIsCompensated={topIsCompensated}
    >
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

const Today = variance(Text)((theme) => ({
  root: {
    alignSelf: "center",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
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
