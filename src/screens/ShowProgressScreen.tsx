import {observer} from 'mobx-react-lite';
import {ReactNode, useCallback, useMemo} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {DailyAchievement} from '../RecoveryRocks/computeDailyAchievement';
import AnniversaryAchievementView from '../components/AnniversaryAchievementView';
import AnnouncementText from '../components/AnnouncementText';
import BackgroundView from '../components/BackgroundView';
import ContentScrollView from '../components/ContentScrollView';
import {
  DailyAchievementTabView,
  ProgressTabKey,
} from '../components/DailyAchievementTabView';
import DatePillText from '../components/DatePillText';
import LogoView from '../components/LogoView';
import SkeletonBaseView from '../components/SkeletonBaseView';
import {TimeUnit} from '../components/TimeUnitView';
import {OptionalGetter, expr, use} from '../mobx-toolbox';
import {fillSpace, textSkeleton} from '../styles';
import {variance} from '../styling';

export type {ProgressTabKey} from '../components/DailyAchievementTabView';

export type ShowProgressScreenProps = {
  today: string;
  onTodayPress?: () => void;
  announcement?: string | ReactNode;
  getTabKey?: OptionalGetter<ProgressTabKey>;
  setTabKey?: (_: ProgressTabKey) => void;
  dailyAchievement?: DailyAchievement | null;
  anniversaryAchievement?: AnniversaryAchievement | null;
  congratulation?: string;
  quote?: string | null;
  onQuotePress?: () => void;
  accretion?: boolean;
  compensateHeaderHeight?: number;
};

export type AnniversaryAchievement = {
  previousValue?: number;
  previousUnit?: TimeUnit;
  currentValue?: number;
  currentUnit?: TimeUnit;
  nextValue?: number;
  nextUnit?: TimeUnit;
};

export default observer(function ShowProgressScreen(
  props: ShowProgressScreenProps,
) {
  const {
    today,
    onTodayPress,
    announcement,
    getTabKey,
    setTabKey,
    dailyAchievement,
    anniversaryAchievement,
    congratulation,
    quote,
    onQuotePress,
    accretion,
    compensateHeaderHeight,
  } = props;
  const contentContainerStyle: ViewStyle = useMemo(
    () => ({
      overflow: Platform.OS === 'web' ? 'hidden' : 'visible',
      paddingTop: compensateHeaderHeight ?? 0,
    }),
    [compensateHeaderHeight],
  );
  const topIsCompensated = compensateHeaderHeight !== undefined;
  const getSpecial = useCallback(
    () => expr(() => !!use(anniversaryAchievement)),
    [anniversaryAchievement],
  );
  return (
    <ContentScrollView
      contentContainerStyle={contentContainerStyle}
      topIsCompensated={topIsCompensated}>
      <BackgroundView getSpecial={getSpecial} />
      <DatePillText style={layoutStyles.center} onPress={onTodayPress}>
        {today}
      </DatePillText>
      <View
        style={anniversaryAchievement ? layoutStyles.grow5 : layoutStyles.grow3}
      />
      {!anniversaryAchievement && (
        <View style={layoutStyles.indent}>
          {announcement === undefined ? (
            <View style={layoutStyles.skeletonContainer}>
              <Skeleton announcement />
              <Skeleton announcement long />
              <Skeleton announcement short />
            </View>
          ) : typeof announcement === 'string' ? (
            <AnnouncementText style={layoutStyles.announcement}>
              {announcement}
            </AnnouncementText>
          ) : (
            announcement
          )}
        </View>
      )}
      {dailyAchievement && !anniversaryAchievement && (
        <DailyAchievementTabView
          style={layoutStyles.indent}
          getTabKey={getTabKey}
          setTabKey={setTabKey}
          dailyAchievement={dailyAchievement}
          accretion={accretion}
        />
      )}
      {anniversaryAchievement && (
        <AnniversaryAchievementView
          style={layoutStyles.indent}
          {...anniversaryAchievement}
          accretion={accretion}
        />
      )}
      {anniversaryAchievement && congratulation !== undefined ? (
        <>
          <Congratulations style={layoutStyles.indent}>
            {congratulation}
          </Congratulations>
          <View style={layoutStyles.grow1} />
        </>
      ) : (
        <View style={layoutStyles.grow4} />
      )}
      {quote !== null && (
        <View style={layoutStyles.indent}>
          {quote === undefined ? (
            <View style={layoutStyles.skeletonContainer}>
              <Skeleton quote />
              <Skeleton quote long />
              <Skeleton quote short />
              <Skeleton quote />
              <Skeleton quote long />
              <Skeleton quote long />
            </View>
          ) : (
            <Quote onPress={onQuotePress}>{quote}</Quote>
          )}
        </View>
      )}
      <View style={layoutStyles.grow3} />
      <LogoView size={56} style={[layoutStyles.logo, layoutStyles.indent]} />
      <View style={layoutStyles.grow2} />
    </ContentScrollView>
  );
});

const WIDTH = 300;

const layoutStyles = StyleSheet.create({
  center: {
    alignSelf: 'center',
  },
  skeletonContainer: {
    alignSelf: 'center',
    width: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  announcement: {
    width: WIDTH,
    alignSelf: 'center',
  },
  logo: {
    alignSelf: 'center',
  },
  indent: {
    marginVertical: 20,
  },
  grow1: fillSpace(1),
  grow2: fillSpace(2),
  grow3: fillSpace(3),
  grow4: fillSpace(4),
  grow5: fillSpace(5),
});

const Congratulations = variance(Text)(theme => ({
  root: {
    textAlign: 'center',
    ...theme.fontByWeight('400'),
    color: theme.palette.textPrimary,
    fontSize: 23,
    lineHeight: 27,
  },
}));

function fixedBasis(_: number): TextStyle {
  return {
    flexBasis: _,
    flexShrink: 0,
    flexGrow: 0,
  };
}

const Skeleton = variance(SkeletonBaseView)(() => ({
  root: {
    flexBasis: '100%',
    flexGrow: 1,
    flexShrink: 1,
    ...textSkeleton(20, 26),
  },
  long: fixedBasis(WIDTH / 3),
  short: fixedBasis((WIDTH / 30) * 4),
  announcement: textSkeleton(20, 26),
  quote: textSkeleton(18, 24),
}));

const Quote = variance(Text)(
  theme => ({
    root: {
      width: 310,
      alignSelf: 'center',
      textAlign: 'center',
      ...theme.fontByWeight('400'),
      color: theme.palette.textPrimary,
      fontSize: 18,
      lineHeight: 24,
    },
  }),
  (): TextProps => ({
    numberOfLines: 4,
    ellipsizeMode: 'tail',
  }),
);
