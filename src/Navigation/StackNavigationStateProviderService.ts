import type {
  EventListenerCallback,
  EventMapCore,
  ParamListBase,
  StackNavigationState,
} from '@react-navigation/native';
import type {
  StackNavigationEventMap,
  StackNavigationProp,
} from '@react-navigation/stack';
import {action, observable, onBecomeObserved, onBecomeUnobserved} from 'mobx';

import type {StackNavigationStateProvider} from './StackNavigationStateProvider';

export default class StackNavigationStateProviderService<
    ParamList extends ParamListBase,
  >
  implements StackNavigationStateProvider<ParamList>, Disposable
{
  private _isListened = false;
  @observable.ref private accessor _state: StackNavigationState<ParamList>;

  private readonly _stack;

  constructor(private _navigation: StackNavigationProp<ParamList>) {
    using stack = new DisposableStack();

    this._state = _navigation.getState();

    stack.defer(
      onBecomeObserved(this, '_state', () => {
        this._isListened = true;
        this._navigation.addListener('state', this._listener);
      }),
    );
    stack.defer(
      onBecomeUnobserved(this, '_state', () => {
        this._navigation.removeListener('state', this._listener);
        this._isListened = false;
      }),
    );

    this._stack = stack.move();
  }

  setNavigation(navigation: StackNavigationProp<ParamList>) {
    if (this._navigation === navigation) {
      return;
    }
    this._navigation.removeListener('state', this._listener);
    this._navigation = navigation;
    if (this._isListened) {
      this._navigation.addListener('state', this._listener);
    }
  }

  get state() {
    return this._state;
  }

  private readonly _listener: EventListenerCallback<
    StackNavigationEventMap & EventMapCore<StackNavigationState<ParamList>>,
    'state'
  > = action(event => {
    this._state = event.data.state;
  });

  [Symbol.dispose]() {
    this._stack[Symbol.dispose]();
  }
}
