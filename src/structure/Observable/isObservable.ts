import type {Observable, ObservableMetadata} from './Observable';
import {OBSERVABLE} from './Observable';

export default function isObservable<T>(_: unknown): _ is Observable<T> {
  return (
    typeof _ === 'object' &&
    _ !== null &&
    !!(Reflect.get(_, OBSERVABLE) as ObservableMetadata | undefined)
      ?.isObservable
  );
}
