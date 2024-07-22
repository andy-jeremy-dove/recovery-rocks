import type {
  ParamListBase,
  StackNavigationState,
} from '@react-navigation/native';

export interface StackNavigationStateProvider<ParamList extends ParamListBase> {
  readonly state: StackNavigationState<ParamList>;
}
