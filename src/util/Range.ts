export type Range<
  L extends number,
  C extends number[] = [],
  R = L,
> = C['length'] extends L ? R : Range<L, [...C, 0], C['length'] | R>;

export type NaturalRange<T extends number> = Exclude<Range<T>, 0>;
