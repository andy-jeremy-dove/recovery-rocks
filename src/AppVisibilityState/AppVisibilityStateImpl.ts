import type {AppVisibility} from '../AppVisibility';
import {CurrentValueRefImpl, LatestValueRefImpl} from '../Ref';
import type {AppVisibilityState} from './AppVisibilityState';

export default class AppVisibilityStateImpl
  implements AppVisibilityState, Disposable
{
  private readonly _status;
  private readonly _isFocused;
  private readonly _stack;

  constructor(
    private readonly _root: {
      readonly appVisibility: AppVisibility;
    },
  ) {
    using stack = new DisposableStack();
    this._status = stack.use(
      new CurrentValueRefImpl(_root.appVisibility.status),
    );
    this._isFocused = stack.use(
      new LatestValueRefImpl(_root.appVisibility.isFocused),
    );
    this._stack = stack.move();
  }

  get status() {
    return this._status.current;
  }

  get isFocused() {
    return this._isFocused.current;
  }

  [Symbol.dispose]() {
    this._stack.dispose();
  }
}
