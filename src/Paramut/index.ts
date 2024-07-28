// parametric mutability

export type _Object<T, Mut extends boolean = false> = Mut extends false
  ? Readonly<T>
  : T;

export type _Map<K, V, Mut extends boolean = false> = Mut extends false
  ? ReadonlyMap<K, V>
  : Map<K, V>;

export type _Set<T, Mut extends boolean = false> = Mut extends false
  ? ReadonlySet<T>
  : Set<T>;
