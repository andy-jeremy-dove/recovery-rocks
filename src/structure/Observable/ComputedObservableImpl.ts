import {Observable} from './Observable';
import ObservableIdentityImpl from './ObservableIdentityImpl';
import {compute, harvest, ReactiveComputation} from './ReactiveComputation';
import {Bus, BusImpl} from '../Bus';

export default class ComputedObservableImpl<T>
  extends ObservableIdentityImpl
  implements Observable<T>
{
  constructor(private readonly _executor: ReactiveComputation<T>) {
    super();
  }

  peek(): T {
    return compute(this._executor);
  }

  private _observables: Set<Observable<unknown>> = new Set();

  private readonly _cleanUp = () => {
    for (const observable of this._observables) {
      observable.updates.forget(this._subscribeAndSend);
    }
  };

  private readonly _subscribeAndSend = () => {
    this._updates.send(this._subscribe());
  };

  private readonly _subscribe = () => {
    this._cleanUp();
    const [_observables, result] = harvest(this._executor);
    this._observables = _observables;
    for (const observable of this._observables) {
      observable.updates.listen(this._subscribeAndSend);
    }
    return result;
  };

  private readonly _updates = BusImpl.lazy<(_: T) => unknown>(() => ({
    onBeforeAnyListener: this._subscribe,
    onAfterCompletelyForgot: this._cleanUp,
  }));

  get updates(): Bus<(_: T) => unknown> {
    return this._updates;
  }
}
