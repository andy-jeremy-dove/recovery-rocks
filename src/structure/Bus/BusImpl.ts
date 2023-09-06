import BaseBusImpl from './BaseBusImpl';
import {Bus} from './Bus';
import {BaseListener} from './BusLike';
import {DeferredCollectionImpl} from '../DeferredCollection';

export default class BusImpl<L extends BaseListener>
  extends BaseBusImpl<L>
  implements Bus<L>
{
  private _listeners = new DeferredCollectionImpl<ReadonlySet<L>, Set<L>>(
    new Set(),
    _ => new Set(_),
  );
  private _onBeforeAnyListener?: () => any;
  private _onAfterCompletelyForgot?: () => any;

  get isBeingListened(): boolean {
    return this._listeners.deferred.size > 0;
  }

  send(...args: Parameters<L>) {
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
    const router = new BusImpl<L>();
    const map = executor(router.send.bind(router));
    router._onBeforeAnyListener = map.onBeforeAnyListener.bind(map);
    router._onAfterCompletelyForgot = map.onAfterCompletelyForgot.bind(map);
    return router;
  }
}

export interface Executor<L extends BaseListener> {
  (send: (...args: Parameters<L>) => void): LazyEventMap;
}

export type LazyEventMap = {
  onBeforeAnyListener: () => any;
  onAfterCompletelyForgot: () => any;
};
