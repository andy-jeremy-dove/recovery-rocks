import {Observable} from './Observable';
import ObservableIdentityImpl from './ObservableIdentityImpl';
import {Bus} from '../Bus';
import TranslatedBusImpl from '../Bus/TranslatedBusImpl';

export default class TranslatedObservableImpl<S, T>
  extends ObservableIdentityImpl
  implements Observable<T>
{
  public readonly updates: Bus<(_: T) => any>;

  constructor(
    protected readonly _source: Observable<S>,
    protected readonly _translate: (_: S) => T,
  ) {
    super();
    this.updates = new TranslatedBusImpl(_source.updates, listener => _ => {
      listener(this._translate(_));
    });
  }

  peek() {
    return this._translate(this._source.peek());
  }
}
