import { PlatformPressable } from "@react-navigation/elements";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Route, SceneMap, TabView } from "react-native-tab-view";
import { SceneRendererProps } from "react-native-tab-view/src/types";

import DailyAchievementView from "./DailyAchievementView";
import { TIME_UNIT_VIEW_HEIGHT } from "./TimeUnitView";
import { DailyAchievement } from "../RecoveryRocks/computeDailyAchievement";
import { createNullableContext, useForcedContext } from "../context";

export type DailyAchievementTabViewProps = {
  tabKey?: ProgressTabKey;
  setTabKey?: (_: ProgressTabKey) => void;
  dailyAchievement: DailyAchievement;
  accretion?: boolean;
};

export type ProgressTabKey = "accumulative" | "months" | "days";

export default function DailyAchievementTabView(
  props: DailyAchievementTabViewProps,
) {
  const { dailyAchievement, accretion } = props;
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
}

function ActualDailyAchievementTabView(props: DailyAchievementTabViewProps) {
  const { tabKey, setTabKey, dailyAchievement, accretion } = props;

  const layout = useWindowDimensions();

  const routes = useMemo<DailyAchievementRoute[]>(
    () => [
      {
        key: "accumulative",
        years: dailyAchievement.fullYearsReached,
        months: dailyAchievement.fullMonthsAfterYearsReached,
        days: dailyAchievement.fullDaysAfterMonthsReached,
      },
      ...(dailyAchievement.fullMonthsReached !==
      dailyAchievement.fullMonthsAfterYearsReached
        ? [{ key: "months", months: dailyAchievement.fullMonthsReached }]
        : []),
      ...(dailyAchievement.fullDaysReached !==
      dailyAchievement.fullDaysAfterMonthsReached
        ? [{ key: "days", days: dailyAchievement.fullDaysReached }]
        : []),
    ],
    [dailyAchievement],
  );
  const index = useMemo(() => {
    const index = routes.findIndex((_) => _.key === tabKey);
    return index === -1 ? 0 : index;
  }, [routes, tabKey]);

  const isSwipingRef = useRef(false);
  const onSwipeStart = useCallback(() => {
    isSwipingRef.current = true;
  }, []);
  const onSwipeEnd = useCallback(() => {
    isSwipingRef.current = false;
  }, []);
  const onPress = useCallback(() => {
    if (!isSwipingRef.current) {
      const nextIndex = (index + 1) % routes.length;
      setTabKey?.(routes[nextIndex].key as ProgressTabKey);
    }
  }, [index, routes, setTabKey]);
  const onIndexChange = useCallback(
    (nextIndex: number) => {
      setTabKey?.(routes[nextIndex].key as ProgressTabKey);
    },
    [routes, setTabKey],
  );

  const tabsProps = useMemo(
    () => ({ onPress, accretion }),
    [onPress, accretion],
  );

  return (
    <TabsContext.Provider value={tabsProps}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        renderTabBar={renderNull}
        style={layoutStyles.page}
        pagerStyle={layoutStyles.page}
        sceneContainerStyle={layoutStyles.page}
        onSwipeStart={onSwipeStart}
        onSwipeEnd={onSwipeEnd}
        initialLayout={{ width: layout.width, height: TIME_UNIT_VIEW_HEIGHT }}
      />
    </TabsContext.Provider>
  );
}

type DailyAchievementBindingProps = {
  route: DailyAchievementRoute;
} & SceneRendererProps;

type DailyAchievementRoute = Route & DailyAchievementProps;

type DailyAchievementProps = {
  days?: number;
  months?: number;
  years?: number;
};

function DailyAchievementBinding(props: DailyAchievementBindingProps) {
  const { route } = props;
  const { days, months, years } = route;
  const { accretion, onPress } = useForcedContext(TabsContext);
  return (
    <PlatformPressable onPress={onPress}>
      <DailyAchievementView
        pointerEvents="box-only"
        style={layoutStyles.page}
        days={days}
        months={months}
        years={years}
        accretion={accretion}
      />
    </PlatformPressable>
  );
}

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
  onPress: () => void;
  accretion?: boolean;
};

const TabsContext = createNullableContext<TabsContextProps>();
