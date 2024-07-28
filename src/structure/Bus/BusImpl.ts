import {DeferredCollectionImpl} from '../DeferredCollection';
import BaseBusImpl from './BaseBusImpl';
import type {Bus} from './Bus';
import type {BaseListener} from './BusLike';

export default class BusImpl<L extends BaseListener>
  extends BaseBusImpl<L>
  implements Bus<L>
{
  public constructor() {
    super();
  }

  private _listeners = new DeferredCollectionImpl<ReadonlySet<L>, Set<L>>(
    new Set(),
    _ => new Set(_),
  );
  private _onBeforeAnyListener?: () => unknown;
  private _onAfterCompletelyForgot?: () => unknown;

  get isBeingListened(): boolean {
    return this._listeners.deferred.size > 0;
  }

  public send(...args: Parameters<L>) {
    this._listeners.guard(actual => {
      for (const listener of actual) {
        listener(...args);
      }
    });
  }

  protected _listenBase(listener: L) {
    if (!this.isBeingListened) {
      this._onBeforeAnyListener?.();
    }
    this._listeners.deferred.add(listener);
  }

  protected _forgetBase(listener: L) {
    this._listeners.deferred.delete(listener);
    if (!this.isBeingListened) {
      this._onAfterCompletelyForgot?.();
    }
  }

  static lazy<L extends BaseListener>(executor: Executor<L>): BusImpl<L> {
    const bus = new BusImpl<L>();
    const map = executor(bus.send.bind(bus));
    bus._onBeforeAnyListener = map.onBeforeAnyListener.bind(map);
    bus._onAfterCompletelyForgot = map.onAfterCompletelyForgot.bind(map);
    return bus;
  }
}

export interface Executor<L extends BaseListener> {
  (send: (...args: Parameters<L>) => void): LazyEventMap;
}

export type LazyEventMap = {
  onBeforeAnyListener: () => unknown;
  onAfterCompletelyForgot: () => unknown;
};
