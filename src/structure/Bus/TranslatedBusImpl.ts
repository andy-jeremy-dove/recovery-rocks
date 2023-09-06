import BaseBusImpl from './BaseBusImpl';
import {Bus} from './Bus';
import {BaseListener, BusLike} from './BusLike';

export default class TranslatedBusImpl<
    S extends BaseListener,
    T extends BaseListener,
  >
  extends BaseBusImpl<T>
  implements Bus<T>
{
  constructor(
    protected readonly _source: BusLike<S>,
    private readonly _translate: (_: T) => S,
  ) {
    super();
  }

  private readonly _listeners = new WeakMap<T, S>();

  protected _listenBase(_listener: T) {
    const listener = this._translate(_listener);
    this._listeners.set(_listener, listener);
    this._source.listen(listener);
  }

  protected _forgetBase(_listener: T) {
    const listener = this._listeners.get(_listener);
    if (!listener) {
      return;
    }
    this._source.forget(listener);
    this._listeners.delete(_listener);
  }
}
