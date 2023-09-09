import IntervalObservableImpl from './IntervalObservableImpl';
import {Millisecond} from './units';

export default function interval(
  coarsening = 1000 as Millisecond, // a second
) {
  return new IntervalObservableImpl(coarsening);
}
