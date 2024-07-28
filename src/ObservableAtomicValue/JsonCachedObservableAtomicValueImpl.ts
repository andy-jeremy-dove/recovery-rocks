import {
  action,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
  runInAction,
} from 'mobx';

import type {BaseAsyncOptions} from '../Async';
import {AbortError} from '../Async/errors';
import type {Json} from '../Json';
import type {JsonAtomicStorage} from '../JsonAtomicStorage';
import {type OptionalGetter, use} from '../mobx-toolbox';
import type {ObservableAtomicValue} from './ObservableAtomicValue';

export default class JsonCachedObservableAtomicValueImpl<T extends Json>
  implements ObservableAtomicValue<T | undefined>, Disposable
{
  @observable.ref private accessor _value: T | undefined;
  private _controller?: AbortController;
  private readonly _stack;

  constructor(
    private readonly _jsonAtomicStorage: JsonAtomicStorage<T>,
    private readonly _$defaultValue: OptionalGetter<T | undefined> = undefined,
  ) {
    using stack = new DisposableStack();

    let controller: AbortController | undefined;

    stack.defer(
      onBecomeObserved(this, '_value', () => {
        void this._onLoad({signal: controller?.signal});
      }),
    );

    stack.defer(
      onBecomeUnobserved(this, '_value', () => {
        controller?.abort(new AbortError());
      }),
    );

    stack.defer(() => controller?.abort(new AbortError()));

    this._stack = stack.move();
  }

  get current() {
    return this._value;
  }

  set(valueOrFactory: T | undefined | ((_: T | undefined) => T | undefined)) {
    const current = runInAction(() => this.current);
    const next =
      typeof valueOrFactory === 'function'
        ? valueOrFactory(current)
        : valueOrFactory;
    this._save(next)
      .then(
        action(() => {
          this._value = next ?? use(this._$defaultValue);
        }),
      )
      .catch((_: unknown) => {
        if (_ instanceof AbortError) {
          return Promise.resolve();
        } else if (_ instanceof Error) {
          return Promise.reject(_);
        } else {
          return Promise.reject(new Error('Unknown error', {cause: _}));
        }
      });
  }

  [Symbol.dispose]() {
    this._stack.dispose();
  }

  private readonly _onLoad = async (options: BaseAsyncOptions) => {
    const initial = await this._load(options);
    runInAction(() => {
      this._value = initial ?? use(this._$defaultValue);
    });
  };

  private async _load(options?: BaseAsyncOptions): Promise<T | undefined> {
    return this._jsonAtomicStorage.load(options);
  }

  private async _save(next: T | undefined): Promise<void> {
    const signal = this._abortPreviousTask();
    await this._jsonAtomicStorage.save(next, {signal});
  }

  private _abortPreviousTask(): AbortSignal {
    this._controller?.abort(new AbortError());
    const controller = new AbortController();
    this._controller = controller;
    return controller.signal;
  }
}
