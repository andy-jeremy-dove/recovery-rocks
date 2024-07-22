import type {Time} from './Time';
import type {Millisecond} from './units';

export default class TimeImpl implements Time {
  now() {
    return Date.now() as Millisecond;
  }
}
