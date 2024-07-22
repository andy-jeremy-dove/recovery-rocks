import type {Opaque} from '../Opaque';

export type Millisecond = Opaque<number, MillisecondTag, TimeTag>;
export type Second = Opaque<number, SecondTag, TimeTag>;
export type Day = Opaque<number, DayTag, TimeTag>;

export type ISODateString = Opaque<string, ISODateStringTag>;

declare const TIME_TAG: unique symbol;
export type TimeTag = typeof TIME_TAG;

declare const MILLISECOND_TAG: unique symbol;
export type MillisecondTag = typeof MILLISECOND_TAG;

declare const SECOND_TAG: unique symbol;
export type SecondTag = typeof SECOND_TAG;

declare const DAY_TAG: unique symbol;
export type DayTag = typeof DAY_TAG;

declare const ISO_DATE_STRING: unique symbol;
export type ISODateStringTag = typeof ISO_DATE_STRING;
