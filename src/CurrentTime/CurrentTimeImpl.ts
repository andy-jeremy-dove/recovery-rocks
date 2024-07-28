import dayjs from 'dayjs';
import {computed} from 'mobx';

import type {Millisecond} from '../Time';
import type {TimeState} from '../TimeState';
import type {CurrentTime} from './CurrentTime';

export default class CurrentTimeImpl implements CurrentTime {
  constructor(
    private readonly _root: {
      readonly timeState: TimeState;
    },
  ) {}

  get raw() {
    return this._root.timeState.getNow(10000 as Millisecond); // 10 seconds
  }

  @computed({keepAlive: true}) get wrapped() {
    return dayjs(this.raw);
  }
}
