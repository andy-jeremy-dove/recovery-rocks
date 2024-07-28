import {expect, it} from '@jest/globals';

import isLeap from './isLeap';

it.each([1988, 1992, 1996, 1600, 2000, 2400])(
  'detects %d as a leap year',
  year => {
    expect(isLeap(year)).toBe(true);
  },
);

it.each([1987, 1993, 1995, 1700, 1800, 1900, 2100, 2200, 2300, 2500, 2600])(
  'ignores %d as a regular year',
  year => {
    expect(isLeap(year)).toBe(false);
  },
);
