import {Observable} from './Observable';

export type ReactiveComputation<T> = (use: UseDependency) => T;

export type UseDependency = <T>(_: Observable<T>) => T;

export function compute<T>(executor: ReactiveComputation<T>): T {
  return executor(_ => _.peek());
}

export function harvest<T>(
  executor: ReactiveComputation<T>,
): [observables: Set<Observable<unknown>>, result: T] {
  const observables: Set<Observable<unknown>> = new Set();
  const use = <T>(_: Observable<T>): T => {
    observables.add(_);
    return _.peek();
  };
  const result = executor(use);
  return [observables, result];
}
