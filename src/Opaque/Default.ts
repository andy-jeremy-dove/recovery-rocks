export type Default<T, D> = T & {
  readonly [DEFAULT_VALUE_TAG]?: D;
};

export type DefaultValue<T> = T extends Default<unknown, infer D> ? D : T;
export type CommonValue<T> = T extends Default<infer TT, unknown> ? TT : T;

declare const DEFAULT_VALUE_TAG: unique symbol;
export type DefaultValueTag = typeof DEFAULT_VALUE_TAG;

function fallbackIfNullish<T extends Default<unknown, unknown>>(
  _: T | null | undefined,
  __: DefaultValue<T>,
): CommonValue<T> | DefaultValue<T>;

function fallbackIfNullish<T, D>(_: T | null | undefined, __: D): T | D;

function fallbackIfNullish(_: unknown, __: unknown): unknown {
  return _ ?? __;
}

export default fallbackIfNullish;
