import {action, observable} from 'mobx';

import type {Ref} from './Ref';

export default class RefImpl<T> implements Ref<T, true> {
  @observable.ref private accessor _current: T;

  constructor(current: T) {
    this._current = current;
  }

  get current(): T {
    return this._current;
  }

  set current(_: T) {
    this._setCurrent(_);
  }

  @action
  private _setCurrent(_: T) {
    this._current = _;
  }
}
