import { useHeaderHeight } from "@react-navigation/elements";
import { StackScreenProps } from "@react-navigation/stack";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { Platform, Pressable, Text } from "react-native";

import { anniversaries } from "../RecoveryRocks/anniversaries";
import computeDailyAchievement from "../RecoveryRocks/computeDailyAchievement";
import detectAnniversary from "../RecoveryRocks/detectAnniversary";
import {
  ProgressTab,
  RootStackParamList,
} from "../RootStack/RootStackParamList";
import { Millisecond } from "../Time";
import { TimeUnit } from "../components/TimeUnitView";
import ShowProgressScreen, {
  AnniversaryAchievement,
  ProgressTabKey,
} from "../screens/ShowProgressScreen";
import { variance } from "../styling";
import turnOut from "../util/turnOut";

export type ShowProgressBindingProps = StackScreenProps<
  RootStackParamList,
  "ShowProgress"
>;

export default function ShowProgressBinding(props: ShowProgressBindingProps) {
  const { navigation, route } = props;
  const tabKey = tabMap[route.params?.tab ?? ProgressTab.Accumulative];
  const setTabKey = useCallback(
    (_: ProgressTabKey) => navigation.setParams({ tab: tabMapReversed[_] }),
    [navigation],
  );
  const promptSetup = useCallback(() => {
    navigation.navigate("PromptSetup");
  }, [navigation]);
  const headerHeight = useHeaderHeight();
  const [$now] = useState(() => dayjs());
  const [$start] = useState(() =>
    $now.subtract(22, "year").subtract(11, "month").subtract(29, "day"),
  );
  const today = $now.format("D MMMM YYYY").toLowerCase();
  const announcement = useMemo(
    () => <Greeting onPress={() => navigation.navigate("PromptSetup")} />,
    [navigation],
  );
  const dailyAchievement = useMemo(
    () =>
      computeDailyAchievement(
        $now.valueOf() as Millisecond,
        $start.valueOf() as Millisecond,
      ),
    [$now, $start],
  );
  const anniversaryAchievement = useMemo<
    AnniversaryAchievement | undefined
  >(() => {
    const detection = detectAnniversary(
      $now.valueOf() as Millisecond,
      { anniversaries },
      $start.valueOf() as Millisecond,
    );
    if (!detection.today) {
      return undefined;
    }
    return {
      previousValue: detection.previous?.timePassed,
      previousUnit:
        detection.previous?.anniversary.unit &&
        timeUnitMap[detection.previous.anniversary.unit],
      currentValue: detection.today.timePassed,
      currentUnit: timeUnitMap[detection.today.anniversary.unit],
      nextValue: detection.next?.timePassed,
      nextUnit:
        detection.next?.anniversary.unit &&
        timeUnitMap[detection.next.anniversary.unit],
    };
  }, [$now, $start]);
  return (
    <ShowProgressScreen
      today={today}
      announcement={announcement}
      // announcement="Илья, ты чист"
      tabKey={tabKey}
      setTabKey={setTabKey}
      dailyAchievement={dailyAchievement}
      anniversaryAchievement={anniversaryAchievement}
      // anniversaryAchievement={{
      //   previousValue: 9,
      //   previousUnit: TimeUnit.Month,
      //   // currentValue: 29,
      //   // currentUnit: TimeUnit.Day,
      //   currentValue: 33,
      //   currentUnit: TimeUnit.Year,
      //   // currentValue: 18,
      //   // currentUnit: TimeUnit.Month,
      //   nextValue: 18,
      //   nextUnit: TimeUnit.Month,
      // }}
      congratulation="Сегодня юбилей!"
      // quote="Не важно, сколько нам уже удалось пройти или сколько нам еще предстоит пройти, – когда мы живем чистыми, путешествие продолжается."
      quote="Мы никогда не видели срыв человека, живущего Программой «Анонимные Наркоманы»"
      // quote={undefined}
      onQuotePress={promptSetup}
      // accretion
      compensateHeaderHeight={headerHeight}
    />
  );
}

type GreetingProps = {
  onPress?: () => void;
};

function Greeting(props: GreetingProps) {
  const { onPress } = props;
  const link = Platform.select({
    web: (
      <Pressable onPress={onPress}>
        {({ focused, hovered, pressed }) => (
          <Link hover={focused || hovered} active={pressed} />
        )}
      </Pressable>
    ),
    default: <Link onPress={onPress} />,
  });
  return (
    <Text>
      Приветствуем, незнакомец!{"\n"}Как давно ты с нами?{"\n"}
      {link}
    </Text>
  );
}

const LINK_TEXT = "Установи начало отсчёта.";

const Link = variance(Text)(
  (theme) => ({
    root: {
      color: theme.palette.link,
    },
    hover: {
      textDecorationColor: theme.palette.link,
      textDecorationLine: "underline",
      textDecorationStyle: "solid",
    },
    active: {
      backgroundColor: theme.palette.backgroundAccent,
    },
  }),
  () => ({
    children: LINK_TEXT,
  }),
);

const timeUnitMap = {
  day: TimeUnit.Day,
  month: TimeUnit.Month,
  year: TimeUnit.Year,
};

const tabMap = {
  [ProgressTab.Accumulative]: "accumulative",
  [ProgressTab.Days]: "days",
  [ProgressTab.Months]: "months",
} as const;

const tabMapReversed = turnOut(tabMap);
