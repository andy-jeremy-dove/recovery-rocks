import {Time} from './Time';
import {Millisecond} from './units';

export default class TimeImpl implements Time {
  now() {
    return Date.now() as Millisecond;
  }
}
