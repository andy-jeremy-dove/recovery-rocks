import type {NaturalRange} from '../util/Range';
import {daysInMonth, type DaysInMonth} from './DaysInMonth';
import isLeap from './isLeap';
import {Month} from './Month';

export function createDateTag(day: number, month: number) {
  dateInvariant(day, month);
  return `${day}/${month}` as DateTag;
}

export function dateInvariant(day: number, _month: number, year?: number) {
  if (!Number.isInteger(_month)) {
    throw new TypeError('Month must be integer');
  }
  if (_month < 0 || _month > 11) {
    throw new RangeError('Month must be from 0 to 11');
  }
  const month = _month as Month;
  if (!Number.isInteger(day)) {
    throw new TypeError('Day must be integer');
  }
  if (year !== undefined && !Number.isInteger(year)) {
    throw new TypeError('Year must be integer');
  }
  const correction =
    month === Month.February && year !== undefined && !isLeap(year) ? 1 : 0;
  const max = daysInMonth[month] - correction;
  if (day < 1 || day > max) {
    throw new RangeError(`Day must be from 0 to ${max}`);
  }
}

export type DateTag = {
  [P in Month]: `${NaturalRange<DaysInMonth[P]>}/${P}`;
}[Month];
