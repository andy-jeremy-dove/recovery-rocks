import {observable, runInAction} from 'mobx';
import {MutableRefObject} from 'react';

export default class RefObjectImpl<T> implements MutableRefObject<T> {
  @observable.ref private accessor _current: T;

  constructor(current: T) {
    this._current = current;
  }

  get current(): T {
    return this._current;
  }

  set current(current: T) {
    runInAction(() => {
      this._current = current;
    });
  }
}
