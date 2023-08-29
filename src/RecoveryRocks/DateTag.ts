export function createDateTag(day: number, month: number) {
  dateTagInvariant(day, month);
  return `${day}/${month}` as DateTag;
}

export function dateTagInvariant(day: number, month: number) {
  if (!Number.isInteger(month) || !Number.isFinite(month)) {
    throw new TypeError("Month must be integer");
  }
  if (month < 0 || month > 11) {
    throw new RangeError("Month must be from 0 to 11");
  }
  if (!Number.isInteger(day) || !Number.isFinite(day)) {
    throw new TypeError("Day must be integer");
  }
  const max = daysInMonth[month as Month];
  if (day < 1 || day > max) {
    throw new RangeError(`Day must be from 0 to ${max}`);
  }
}

export type DateTag = {
  [P in Month]: `${NaturalRange<DaysInMonth[P]>}/${P}`;
}[Month];

export enum Month {
  January = 0,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export type DaysInMonth = typeof daysInMonth;
export const daysInMonth = {
  [Month.January]: 31,
  [Month.February]: 29,
  [Month.March]: 31,
  [Month.April]: 30,
  [Month.May]: 31,
  [Month.June]: 30,
  [Month.July]: 31,
  [Month.August]: 31,
  [Month.September]: 30,
  [Month.October]: 31,
  [Month.November]: 30,
  [Month.December]: 31,
} as const;

export type Range<L, C extends any[] = [], R = L> = C["length"] extends L
  ? R
  : Range<L, [...C, 0], C["length"] | R>;

export type NaturalRange<T> = Exclude<Range<T>, 0>;
