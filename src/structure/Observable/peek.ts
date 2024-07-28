import isObservable from './isObservable';
import type {Peeked} from './Observable';

function peek<T>(source: T): Peeked<T> {
  const result = isObservable(source) ? source.peek() : source;
  return result as Peeked<T>;
}

export default peek;
