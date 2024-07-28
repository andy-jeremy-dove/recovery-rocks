import {now} from 'mobx-utils';

import {AppVisibilityStatus} from '../AppVisibility';
import type {AppVisibilityState} from '../AppVisibilityState';
import type {Millisecond, Time} from '../Time';
import type {TimeState} from './TimeState';

export default class TimeStateImpl implements TimeState {
  constructor(
    private readonly _root: {
      readonly time: Time;
      readonly appVisibilityState: AppVisibilityState;
    },
  ) {}

  getNow(interval: Millisecond): Millisecond {
    if (this._root.appVisibilityState.status === AppVisibilityStatus.Active) {
      return now(interval) as Millisecond;
    } else {
      return this._root.time.now();
    }
  }
}
