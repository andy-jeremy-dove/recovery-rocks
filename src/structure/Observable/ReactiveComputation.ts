import {Observable} from './Observable';

export type ReactiveComputation<T> = (
  use: UseDependency,
  drop: DropDependency,
) => T;

export type UseDependency = <T>(_: Observable<T>) => T;
export type DropDependency = (_: Observable<unknown>) => void;

export function compute<T>(executor: ReactiveComputation<T>): T {
  return executor(_ => _.peek(), noop);
}

const noop = () => {};

export function harvest<T>(
  executor: ReactiveComputation<T>,
): [observables: Set<Observable<unknown>>, result: T] {
  const observables: Set<Observable<unknown>> = new Set();
  const use = <T>(_: Observable<T>): T => {
    observables.add(_);
    return _.peek();
  };
  const drop = (_: Observable<unknown>) => {
    observables.delete(_);
  };
  const result = executor(use, drop);
  return [observables, result];
}
