import type {ParamListBase} from '@react-navigation/native';
import {computed} from 'mobx';
import {useCallback, useMemo} from 'react';

import type {StackNavigationStateProvider} from './StackNavigationStateProvider';

export default function useNavigationGetIsFocused(
  routeKey: string,
  provider: StackNavigationStateProvider<ParamListBase>,
): () => boolean {
  const isFocused = useMemo(
    () =>
      computed(
        () => provider.state.routes[provider.state.index]?.key === routeKey,
        {name: `route_${routeKey}#isFocused`},
      ),
    [provider, routeKey],
  );
  return useCallback(() => isFocused.get(), [isFocused]);
}
