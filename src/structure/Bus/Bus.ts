import {BaseListener, BusLike} from './BusLike';
import {Disposable} from '../Disposable';

export interface Bus<L extends BaseListener> extends BusLike<L> {
  listen(listener: L): Disposable;
  once(listener: L): Disposable;
  forget(listener: L): void;
}
