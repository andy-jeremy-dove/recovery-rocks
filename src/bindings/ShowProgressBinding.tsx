import {useHeaderHeight} from '@react-navigation/elements';
import {StackScreenProps} from '@react-navigation/stack';
import dayjs from 'dayjs';
import {observer} from 'mobx-react-lite';
import {expr} from 'mobx-utils';
import {useCallback, useMemo, useState} from 'react';
import {Pressable} from 'react-native';

import {useStackNavigationState} from '../Navigation';
import useNavigationRoute from '../Navigation/useNavigationRoute';
import {anniversaries} from '../RecoveryRocks/anniversaries';
import computeDailyAchievement from '../RecoveryRocks/computeDailyAchievement';
import detectAnniversary from '../RecoveryRocks/detectAnniversary';
import {ProgressTab, RootStackParamList} from '../RootStack/RootStackParamList';
import {Millisecond} from '../Time';
import AnnouncementText from '../components/AnnouncementText';
import LinkText from '../components/LinkText';
import {TimeUnit} from '../components/TimeUnitView';
import ShowProgressScreen, {
  AnniversaryAchievement,
  ProgressTabKey,
} from '../screens/ShowProgressScreen';
import turnOut from '../util/turnOut';

export type ShowProgressBindingProps = StackScreenProps<
  RootStackParamList,
  'ShowProgress'
>;

export default function ShowProgressBinding(props: ShowProgressBindingProps) {
  const {navigation, route} = props;
  return (
    <ShowProgressStableBinding navigation={navigation} routeKey={route.key} />
  );
}

const ShowProgressStableBinding = observer(_ShowProgressStableBinding);

type ShowProgressStableBindingProps = Pick<
  ShowProgressBindingProps,
  'navigation'
> & {
  routeKey: string;
};

function _ShowProgressStableBinding(props: ShowProgressStableBindingProps) {
  const {navigation, routeKey} = props;
  const state = useStackNavigationState(navigation);
  const getRoute = useNavigationRoute<RootStackParamList, 'ShowProgress'>(
    routeKey,
    state,
  );
  const getTabKey = useCallback(
    () =>
      expr(() => tabMap[getRoute().params?.tab ?? ProgressTab.Accumulative]),
    [getRoute],
  );
  const setTabKey = useCallback(
    (_: ProgressTabKey) => navigation.setParams({tab: tabMapReversed[_]}),
    [navigation],
  );
  const showTopic = useCallback(() => {
    navigation.navigate('ShowTopic');
  }, [navigation]);
  const headerHeight = useHeaderHeight();
  const [$now] = useState(() => dayjs());
  const [$start] = useState(() =>
    $now.subtract(22, 'year').subtract(11, 'month').subtract(29, 'day'),
  );
  const today = $now.format('D MMMM YYYY').toLowerCase();
  const announcement = useMemo(
    () => <Greeting onPress={() => navigation.navigate('PromptSetup')} />,
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
      {anniversaries},
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
      onTodayPress={showTopic}
      announcement={announcement}
      getTabKey={getTabKey}
      setTabKey={setTabKey}
      dailyAchievement={dailyAchievement}
      anniversaryAchievement={anniversaryAchievement}
      congratulation="Сегодня юбилей!"
      quote="Не важно, сколько нам уже удалось пройти или сколько нам еще предстоит пройти, – когда мы живем чистыми, путешествие продолжается."
      onQuotePress={showTopic}
      compensateHeaderHeight={headerHeight}
    />
  );
}

type GreetingProps = {
  onPress?: () => void;
};

function Greeting(props: GreetingProps) {
  const {onPress} = props;
  return (
    <Pressable onPress={onPress}>
      {({focused, hovered, pressed}) => (
        <AnnouncementText>
          Приветствуем, незнакомец!{'\n'}Как давно ты с нами?{'\n'}
          <LinkText hover={focused || hovered} active={pressed}>
            Установи начало отсчёта.
          </LinkText>
        </AnnouncementText>
      )}
    </Pressable>
  );
}

const timeUnitMap = {
  day: TimeUnit.Day,
  month: TimeUnit.Month,
  year: TimeUnit.Year,
};

const tabMap = {
  [ProgressTab.Accumulative]: 'accumulative',
  [ProgressTab.Days]: 'days',
  [ProgressTab.Months]: 'months',
} as const;

const tabMapReversed = turnOut(tabMap);
