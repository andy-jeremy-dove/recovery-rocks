export type Opaque<
  Cover,
  Essence,
  Tag extends number | string | symbol = GlobalDefaultTag,
> = Cover & {
  readonly [P in Tag]: Essence;
};

export type Tagged<Cover, Tag extends number | string | symbol> = Opaque<
  Cover,
  Tag,
  Tag
>;

export type Uncovered<
  T extends Opaque<unknown, unknown, Tag>,
  Tag extends number | string | symbol = GlobalDefaultTag,
> = T[Tag];

declare const TAG: unique symbol;
export type GlobalDefaultTag = typeof TAG;
