import NarrowObservableImpl from './NarrowObservableImpl';
import {Observable, OptionalObservable, Peeked} from './Observable';
import isObservable from './isObservable';
import {Comparator, strict} from '../../Comparator';

function narrow<S extends Observable<any>, T>(
  source: S,
  translate: (_: Peeked<S>) => T,
  areEqual?: Comparator<T>,
): Observable<T>;
function narrow<S, T>(
  source: S,
  translate: (_: Peeked<S>) => T,
  areEqual?: Comparator<T>,
): OptionalObservable<T>;
function narrow<S, T>(
  source: S,
  translate: (_: Peeked<S>) => T,
  areEqual: Comparator<T> = strict,
): OptionalObservable<T> {
  if (!isObservable(source)) {
    return translate(source as Peeked<S>);
  }
  return new NarrowObservableImpl(
    source as Observable<Peeked<S>>,
    translate,
    areEqual,
  );
}

export default narrow;
