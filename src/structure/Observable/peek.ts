import {Peeked} from './Observable';
import isObservable from './isObservable';

function peek<T>(source: T): Peeked<T> {
  const result = isObservable(source) ? source.peek() : source;
  return result as Peeked<T>;
}

export default peek;
