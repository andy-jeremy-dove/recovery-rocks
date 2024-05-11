import {observer} from 'mobx-react-lite';
import {useCallback, useMemo, useRef} from 'react';
import {Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Route, SceneMap, TabView} from 'react-native-tab-view';
import {Layout} from 'react-native-tab-view/lib/typescript/src/types';
import {SceneRendererProps} from 'react-native-tab-view/src/types';

import DailyAchievementView from './DailyAchievementView';
import {TIME_UNIT_VIEW_HEIGHT} from './TimeUnitView';
import {DailyAchievement} from '../RecoveryRocks/computeDailyAchievement';
import {createNullableContext, useForcedContext} from '../context';
import {heavyImpact, lightImpact} from '../haptics/haptics';
import {expr, OptionalGetter, use} from '../mobx-toolbox';

export type DailyAchievementTabViewProps = {
  getTabKey?: OptionalGetter<ProgressTabKey>;
  setTabKey?: (_: ProgressTabKey) => void;
  dailyAchievement: DailyAchievement;
  accretion?: boolean;
};

export type ProgressTabKey = 'accumulative' | 'months' | 'days';

export default observer(function DailyAchievementTabView(
  props: DailyAchievementTabViewProps,
) {
  const {dailyAchievement, accretion} = props;
  if (
    dailyAchievement.fullMonthsReached ===
      dailyAchievement.fullMonthsAfterYearsReached &&
    dailyAchievement.fullDaysReached ===
      dailyAchievement.fullDaysAfterMonthsReached
  ) {
    return (
      <DailyAchievementView
        style={layoutStyles.page}
        days={dailyAchievement.fullDaysAfterMonthsReached}
        months={dailyAchievement.fullMonthsAfterYearsReached}
        years={dailyAchievement.fullYearsReached}
        accretion={accretion}
      />
    );
  }
  return <ActualDailyAchievementTabView {...props} />;
});

const ActualDailyAchievementTabView = observer(
  function ActualDailyAchievementTabView(props: DailyAchievementTabViewProps) {
    const {getTabKey, setTabKey, dailyAchievement, accretion} = props;

    const insets = useSafeAreaInsets();
    const layout = useWindowDimensions();

    const routes = useMemo<DailyAchievementRoute[]>(
      () => [
        {
          key: 'accumulative',
          years: dailyAchievement.fullYearsReached,
          months: dailyAchievement.fullMonthsAfterYearsReached,
          days: dailyAchievement.fullDaysAfterMonthsReached,
        },
        ...(dailyAchievement.fullMonthsReached !==
        dailyAchievement.fullMonthsAfterYearsReached
          ? [{key: 'months', months: dailyAchievement.fullMonthsReached}]
          : []),
        ...(dailyAchievement.fullDaysReached !==
        dailyAchievement.fullDaysAfterMonthsReached
          ? [{key: 'days', days: dailyAchievement.fullDaysReached}]
          : []),
      ],
      [dailyAchievement],
    );
    const getIndex = useCallback(
      () =>
        expr(() => {
          const tabKey = use(getTabKey);
          if (tabKey === undefined) {
            return 0;
          }
          const index = routes.findIndex(_ => _.key === tabKey);
          return index === -1 ? 0 : index;
        }),
      [getTabKey, routes],
    );
    const index = use(getIndex);

    const isSwipingRef = useRef(false);
    const onSwipeStart = useCallback(async () => {
      isSwipingRef.current = true;
    }, []);
    const onSwipeEnd = useCallback(async () => {
      const wasSwiping = isSwipingRef.current;
      isSwipingRef.current = false;
      if (wasSwiping) {
        heavyImpact();
      }
    }, []);
    const onPress = useCallback(() => {
      if (!isSwipingRef.current) {
        const nextIndex = (use(getIndex) + 1) % routes.length;
        setTabKey?.(routes[nextIndex].key as ProgressTabKey);
      }
    }, [getIndex, routes, setTabKey]);
    const onPressOut = useCallback(() => {
      if (!isSwipingRef.current) {
        heavyImpact();
      }
    }, []);
    const onIndexChange = useCallback(
      (nextIndex: number) => {
        setTabKey?.(routes[nextIndex].key as ProgressTabKey);
      },
      [routes, setTabKey],
    );

    const tabsProps = useMemo(
      () => ({
        onPress,
        onPressIn: lightImpact,
        onPressOut,
        accretion,
      }),
      [onPress, onPressOut, accretion],
    );

    const width = layout.width - insets.left - insets.right;
    const initialLayout = useMemo<Partial<Layout>>(
      () => ({
        width,
        height: TIME_UNIT_VIEW_HEIGHT,
      }),
      [width],
    );

    return (
      <TabsContext.Provider value={tabsProps}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={onIndexChange}
          renderTabBar={renderNull}
          style={layoutStyles.page}
          pagerStyle={layoutStyles.page}
          sceneContainerStyle={layoutStyles.page}
          onSwipeStart={onSwipeStart}
          onSwipeEnd={onSwipeEnd}
          initialLayout={initialLayout}
        />
      </TabsContext.Provider>
    );
  },
);

type DailyAchievementBindingProps = {
  route: DailyAchievementRoute;
} & SceneRendererProps;

type DailyAchievementRoute = Route & DailyAchievementProps;

type DailyAchievementProps = {
  days?: number;
  months?: number;
  years?: number;
};

const DailyAchievementBinding = observer(function DailyAchievementBinding(
  props: DailyAchievementBindingProps,
) {
  const {route} = props;
  const {days, months, years} = route;
  const {accretion, onPress, onPressIn, onPressOut} =
    useForcedContext(TabsContext);
  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <DailyAchievementView
        pointerEvents="box-only"
        style={layoutStyles.page}
        days={days}
        months={months}
        years={years}
        accretion={accretion}
      />
    </Pressable>
  );
});

const renderScene = SceneMap({
  accumulative: DailyAchievementBinding,
  months: DailyAchievementBinding,
  days: DailyAchievementBinding,
});

const renderNull = () => null;

const layoutStyles = StyleSheet.create({
  page: {
    flex: 0,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: TIME_UNIT_VIEW_HEIGHT,
    height: TIME_UNIT_VIEW_HEIGHT,
  },
});

type TabsContextProps = {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  accretion?: boolean;
};

const TabsContext = createNullableContext<TabsContextProps>();
