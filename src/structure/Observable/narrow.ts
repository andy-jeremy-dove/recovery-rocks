import NarrowObservableImpl from './NarrowObservableImpl';
import {Observable, OptionalObservable, Peeked} from './Observable';
import isObservable from './isObservable';

function narrow<S extends Observable<any>, T>(
  source: S,
  translate: (_: Peeked<S>) => T,
  areEqual?: (one: T, another: T) => boolean,
): Observable<T>;
function narrow<S, T>(
  source: S,
  translate: (_: Peeked<S>) => T,
  areEqual?: (one: T, another: T) => boolean,
): OptionalObservable<T>;
function narrow<S, T>(
  source: S,
  translate: (_: Peeked<S>) => T,
  areEqual: (one: T, another: T) => boolean = (a, b) => Object.is(a, b),
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
