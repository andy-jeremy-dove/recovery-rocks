import {Opaque} from '../Opaque';

export type AbortedAbortSignal = Opaque<
  AbortSignal,
  AbortedTag,
  DeterminationTag
>;
export type NeverAbortSignal = Opaque<AbortSignal, NeverTag, DeterminationTag>;

declare const DETERMINATION_TAG: unique symbol;
export type DeterminationTag = typeof DETERMINATION_TAG;

declare const ABORTED_TAG: unique symbol;
export type AbortedTag = typeof ABORTED_TAG;

declare const NEVER_TAG: unique symbol;
export type NeverTag = typeof NEVER_TAG;
