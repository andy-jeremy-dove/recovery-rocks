export type OptionalGetter<T> = T | (() => T);

export type OptionalGetterValue<T> =
  T extends OptionalGetter<infer TT> ? TT : T;
