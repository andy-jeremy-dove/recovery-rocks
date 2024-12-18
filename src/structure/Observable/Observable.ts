import type {Bus} from '../Bus';

export interface Observable<T> {
  readonly [OBSERVABLE]: ObservableMetadata;

  peek(): T;

  readonly updates: Bus<(_: T) => unknown>;
}

export type Peeked<T> =
  T extends Observable<infer X> ? Exclude<T, Observable<X>> | X : T;

export type OptionalObservable<T> = Observable<T> | T;

export const OBSERVABLE = Symbol();

export interface ObservableMetadata {
  readonly isObservable: true;
}
