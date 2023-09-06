import {ParamListBase, StackNavigationState} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';

import StackNavigationStateObservableImpl from './StackNavigationStateObservableImpl';
import {Observable} from '../structure';

export default function useStackNavigationState<
  ParamList extends ParamListBase,
>(
  navigation: StackNavigationProp<ParamList>,
): Observable<StackNavigationState<ParamList>> {
  const [observable] = useState(
    () => new StackNavigationStateObservableImpl(navigation),
  );
  observable.setNavigation(navigation);
  return observable;
}
