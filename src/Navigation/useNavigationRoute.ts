import type {ParamListBase} from '@react-navigation/native';
import type {
  NavigationState,
  PartialState,
  Route,
} from '@react-navigation/routers';
import {useCallback} from 'react';

import {expr} from '../mobx-toolbox';
import type {StackNavigationStateProvider} from './StackNavigationStateProvider';

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
  provider: StackNavigationStateProvider<ParamList>,
): () => NavigationRoute<ParamList, RouteName> {
  return useCallback(
    () =>
      expr(() => {
        const currentRoute = provider.state.routes.find(
          _ => _.key === routeKey,
        );
        return currentRoute as NavigationRoute<ParamList, RouteName>;
      }),
    [provider, routeKey],
  );
}
