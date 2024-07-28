import type {Appearance} from '../Appearance';
import {CurrentValueRefImpl} from '../Ref';
import type {AppearanceState} from './AppearanceState';

export default class AppearanceStateImpl
  implements AppearanceState, Disposable
{
  private readonly _colorScheme;
  private readonly _stack;

  constructor(
    private readonly _root: {
      readonly appearance: Appearance;
    },
  ) {
    using stack = new DisposableStack();
    this._colorScheme = stack.use(
      new CurrentValueRefImpl(this._root.appearance.colorScheme),
    );
    this._stack = stack.move();
  }

  get colorScheme() {
    return this._colorScheme.current;
  }

  [Symbol.dispose]() {
    this._stack.dispose();
  }
}
