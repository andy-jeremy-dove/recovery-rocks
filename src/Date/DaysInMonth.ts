import createDictionary from '../Dictionary/createDictionary';
import {Month} from './Month';

export type DaysInMonth = typeof daysInMonth;

export const daysInMonth = Object.freeze(
  createDictionary({
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
  } as const),
);
