import {ComponentProps, ReactNode, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  AnimatableComponent,
  CustomAnimation,
  View as AnimatableView,
} from 'react-native-animatable';

import {DailyAchievement} from '../RecoveryRocks/computeDailyAchievement';
import AnniversaryAchievementView from '../components/AnniversaryAchievementView';
import ContentScrollView from '../components/ContentScrollView';
import DailyAchievementTabView, {
  ProgressTabKey,
} from '../components/DailyAchievementTabView';
import LogoView from '../components/LogoView';
import {TIME_UNIT_VIEW_HEIGHT, TimeUnit} from '../components/TimeUnitView';
import {fillSpace} from '../styles';
import {variance} from '../styling';

export type {ProgressTabKey} from '../components/DailyAchievementTabView';

export type ShowProgressScreenProps = {
  today: string;
  announcement?: string | ReactNode;
  tabKey?: ProgressTabKey;
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

export default function ShowProgressScreen(props: ShowProgressScreenProps) {
  const {
    today,
    announcement,
    tabKey,
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
    () => ({paddingTop: compensateHeaderHeight ?? 0}),
    [compensateHeaderHeight],
  );
  const topIsCompensated = compensateHeaderHeight !== undefined;
  return (
    <ContentScrollView
      contentContainerStyle={contentContainerStyle}
      topIsCompensated={topIsCompensated}>
      <Today>{today}</Today>
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
          ) : (
            <Announcement>{announcement}</Announcement>
          )}
        </View>
      )}
      {dailyAchievement && !anniversaryAchievement && (
        <View style={[layoutStyles.indent, layoutStyles.pageRoot]}>
          <DailyAchievementTabView
            tabKey={tabKey}
            setTabKey={setTabKey}
            dailyAchievement={dailyAchievement}
            accretion={accretion}
          />
        </View>
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
}

const layoutStyles = StyleSheet.create({
  skeletonContainer: {
    alignSelf: 'center',
    width: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  pageRoot: {
    height: TIME_UNIT_VIEW_HEIGHT,
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

const LINE_HEIGHT = 21;
const PADDING = 4;
const BORDER_RADIUS = (LINE_HEIGHT + PADDING * 2) / 2;

const Today = variance(Text)(theme => ({
  root: {
    alignSelf: 'center',
    overflow: 'hidden',
    paddingVertical: PADDING,
    paddingHorizontal: BORDER_RADIUS,
    borderRadius: BORDER_RADIUS,
    textAlign: 'center',
    backgroundColor: theme.palette.backgroundAccent,
    ...theme.fontByWeight('400'),
    color: theme.palette.textAccent,
    fontSize: 17,
    lineHeight: LINE_HEIGHT,
  },
}));

const WIDTH = 300;

const Announcement = variance(Text)(theme => ({
  root: {
    width: WIDTH,
    alignSelf: 'center',
    textAlign: 'center',
    ...theme.fontByWeight('400'),
    color: theme.palette.textPrimary,
    fontSize: 20,
    lineHeight: 26,
  },
}));

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

function textSkeleton(fontSize: number, lineHeight: number): TextStyle {
  const height = (fontSize / 20) * 16;
  const margin = ((lineHeight - fontSize) / 6) * 5;
  return {height, margin};
}

const Skeleton = variance(AnimatableView)(
  theme => ({
    root: {
      flexBasis: '100%',
      flexGrow: 1,
      flexShrink: 1,
      ...textSkeleton(20, 26),
      borderRadius: 4,
      opacity: OPACITY,
      backgroundColor: theme.palette.textPrimary,
    },
    long: fixedBasis(WIDTH / 3),
    short: fixedBasis((WIDTH / 30) * 4),
    announcement: textSkeleton(20, 26),
    quote: textSkeleton(18, 24),
  }),
  (): AnimatableViewProps => ({
    animation: fadeInOut,
    duration: 2000,
    iterationCount: 'infinite',
    useNativeDriver: true,
  }),
);

const OPACITY = 0.05;

const fadeInOut: CustomAnimation = {
  0: {opacity: OPACITY},
  0.5: {opacity: 0.1},
  1: {opacity: OPACITY},
};

type AnimatableViewProps = ComponentProps<
  AnimatableComponent<ViewProps, ViewStyle>
>;

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
