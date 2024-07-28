import {action, observable, onBecomeObserved, onBecomeUnobserved} from 'mobx';

import type {BusLike} from '../structure';
import type {Ref} from './Ref';

export default class LatestValueRefImpl<T, D = undefined>
  implements Ref<T | D, true>, Disposable
{
  @observable.ref private accessor _value: T | D;
  private readonly _stack: DisposableStack;

  constructor(
    bus: BusLike<(_: T) => unknown>,
    defaultValue: D = undefined as D,
  ) {
    using stack = new DisposableStack();

    this._value = defaultValue;

    stack.defer(
      onBecomeObserved(this, '_value', () => {
        bus.listen(this._onUpdate);
      }),
    );

    stack.defer(
      onBecomeUnobserved(this, '_value', () => {
        bus.forget(this._onUpdate);
      }),
    );

    this._stack = stack.move();
  }

  get current() {
    return this._value;
  }

  [Symbol.dispose]() {
    this._stack.dispose();
  }

  private readonly _onUpdate = action((_: T) => {
    this._value = _;
  });
}
