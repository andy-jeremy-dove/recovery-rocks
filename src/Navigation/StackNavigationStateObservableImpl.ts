import {
  EventListenerCallback,
  EventMapCore,
  ParamListBase,
  StackNavigationState,
} from '@react-navigation/native';
import {
  StackNavigationEventMap,
  StackNavigationProp,
} from '@react-navigation/stack';

import {StackNavigationStateObservable} from './StackNavigationStateObservable';
import {Bus, BusImpl, ObservableIdentityImpl} from '../structure';

export default class StackNavigationStateObservableImpl<
    ParamList extends ParamListBase,
  >
  extends ObservableIdentityImpl
  implements StackNavigationStateObservable<ParamList>
{
  private _isListened = false;

  constructor(private _navigation: StackNavigationProp<ParamList>) {
    super();
  }

  setNavigation(navigation: StackNavigationProp<ParamList>) {
    this._navigation.removeListener('state', this._listener);
    this._navigation = navigation;
    if (this._isListened) {
      this._navigation.addListener('state', this._listener);
    }
  }

  peek() {
    return this._navigation.getState();
  }

  private readonly _listener: EventListenerCallback<
    StackNavigationEventMap & EventMapCore<StackNavigationState<ParamList>>,
    'state'
  > = event => {
    this._updates.send(event.data.state);
  };

  private readonly _updates = BusImpl.lazy<
    (_: StackNavigationState<ParamList>) => any
  >(() => {
    const that = this;
    return {
      onBeforeAnyListener() {
        that._isListened = true;
        that._navigation.addListener('state', that._listener);
      },
      onAfterCompletelyForgot() {
        that._navigation.removeListener('state', that._listener);
        that._isListened = false;
      },
    };
  });

  get updates(): Bus<(_: StackNavigationState<ParamList>) => any> {
    return this._updates;
  }
}
