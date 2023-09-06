import {Bus} from './Bus';
import {BaseListener} from './BusLike';
import {Disposable} from '../Disposable';

export default abstract class BaseBusImpl<L extends BaseListener>
  implements Bus<L>
{
  protected constructor() {}

  protected abstract _listenBase(listener: L): void;
  protected abstract _forgetBase(listener: L): void;

  listen(listener: L): Disposable {
    this._listenBase(listener);
    const that = this;
    return {
      [Symbol.dispose]() {
        that.forget(listener);
      },
    };
  }

  once(listener: L): Disposable {
    const _listener = ((...args: Parameters<L>) => {
      listener(...args);
      this.forget(_listener);
    }) as L;
    return this.listen(_listener);
  }

  forget(listener: L) {
    this._forgetBase(listener);
  }
}
