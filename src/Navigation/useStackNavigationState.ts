import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';

import {StackNavigationStateProvider} from './StackNavigationStateProvider';
import StackNavigationStateProviderService from './StackNavigationStateProviderService';

export default function useStackNavigationState<
  ParamList extends ParamListBase,
>(
  navigation: StackNavigationProp<ParamList>,
): StackNavigationStateProvider<ParamList> {
  const [observable] = useState(
    () => new StackNavigationStateProviderService(navigation),
  );
  useEffect(() => {
    return () => observable[Symbol.dispose]();
  }, [observable]);
  observable.setNavigation(navigation);
  return observable;
}
