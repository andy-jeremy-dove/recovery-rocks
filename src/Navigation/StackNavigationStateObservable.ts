import {ParamListBase, StackNavigationState} from '@react-navigation/native';

import {Observable} from '../structure';

export interface StackNavigationStateObservable<ParamList extends ParamListBase>
  extends Observable<StackNavigationState<ParamList>> {}
