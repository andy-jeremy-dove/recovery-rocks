import type {NavigationProp} from '@react-navigation/native';
import {useCallback} from 'react';

import type {ProgressTabKey} from '../../components/DailyAchievementTabView';
import {expr} from '../../mobx-toolbox';
import type {StackNavigationStateProvider} from '../../Navigation';
import useNavigationRoute from '../../Navigation/useNavigationRoute';
import {
  ProgressTab,
  type RootStackParamList,
} from '../../RootStack/RootStackParamList';
import turnOut from '../../util/turnOut';

export default function useTabKey(
  navigation: NavigationProp<RootStackParamList, 'ShowProgress'>,
  routeKey: string,
  provider: StackNavigationStateProvider<RootStackParamList>,
): [getTabKey: () => ProgressTabKey, setTabKey: (_: ProgressTabKey) => void] {
  const getRoute = useNavigationRoute<RootStackParamList, 'ShowProgress'>(
    routeKey,
    provider,
  );
  const getTabKey = useCallback(
    () =>
      expr(() => tabMap[getRoute().params?.tab ?? ProgressTab.Accumulative]),
    [getRoute],
  );
  const setTabKey = useCallback(
    (_: ProgressTabKey) => {
      navigation.setParams({tab: tabMapReversed[_]});
    },
    [navigation],
  );
  return [getTabKey, setTabKey];
}

const tabMap = {
  [ProgressTab.Accumulative]: 'accumulative',
  [ProgressTab.Days]: 'days',
  [ProgressTab.Months]: 'months',
} as const;

const tabMapReversed = turnOut(tabMap);
