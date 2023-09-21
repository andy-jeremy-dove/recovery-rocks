import {ParamListBase, StackNavigationState} from '@react-navigation/native';
import {
  NavigationState,
  PartialState,
  Route,
} from '@react-navigation/routers/src/types';
import {useMemo} from 'react';

import {narrow, Observable} from '../structure';

export type NavigationRoute<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> = Route<Extract<RouteName, string>, ParamList[RouteName]> & {
  state?: NavigationState | PartialState<NavigationState>;
};

export default function useNavigationRoute<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
>(
  routeKey: string,
  $state: Observable<StackNavigationState<ParamList>>,
): Observable<NavigationRoute<ParamList, RouteName>> {
  return useMemo(
    () =>
      narrow($state, _ => {
        const currentRoute = _.routes.find(__ => __.key === routeKey);
        return currentRoute as NavigationRoute<ParamList, RouteName>;
      }),
    [$state, routeKey],
  );
}
