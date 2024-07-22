import {expect, it} from '@jest/globals';
import dayjs from 'dayjs';

import type {Millisecond} from '../Time';
import computeDailyAchievement from './computeDailyAchievement';

it('computes daily achievement for the day zero', () => {
  const achievement = computeDailyAchievement(start, start);
  expect(achievement).toStrictEqual(zeroAchievement);
});

it('computes daily achievement for the same day', () => {
  const $target = dayjs('2018-04-13 20:00');
  const target = $target.valueOf() as Millisecond;
  const achievement = computeDailyAchievement(target, start);
  expect(achievement).toStrictEqual(zeroAchievement);
});

it('computes daily achievement for the next month', () => {
  const $target = dayjs('2018-05-20 20:00');
  const target = $target.valueOf() as Millisecond;
  const achievement = computeDailyAchievement(target, start);
  expect(achievement).toMatchInlineSnapshot(`
{
  "fullDaysAfterMonthsReached": 7,
  "fullDaysReached": 37,
  "fullMonthsAfterYearsReached": 1,
  "fullMonthsReached": 1,
  "fullYearsReached": 0,
}
`);
});

it('computes daily achievement for the next year', () => {
  const $target = dayjs('2019-07-02 20:00');
  const target = $target.valueOf() as Millisecond;
  const achievement = computeDailyAchievement(target, start);
  expect(achievement).toMatchInlineSnapshot(`
{
  "fullDaysAfterMonthsReached": 19,
  "fullDaysReached": 445,
  "fullMonthsAfterYearsReached": 2,
  "fullMonthsReached": 14,
  "fullYearsReached": 1,
}
`);
});

const zeroAchievement = {
  fullDaysAfterMonthsReached: 0,
  fullDaysReached: 0,
  fullMonthsAfterYearsReached: 0,
  fullMonthsReached: 0,
  fullYearsReached: 0,
};

const $start = dayjs('2018-04-13 19:18');
const start = $start.valueOf() as Millisecond;
