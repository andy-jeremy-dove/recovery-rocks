import dayjs from 'dayjs';

import {Millisecond} from '../Time';

export type DailyAchievement = {
  fullDaysAfterMonthsReached: number;
  fullMonthsAfterYearsReached: number;
  fullDaysReached: number;
  fullMonthsReached: number;
  fullYearsReached: number;
};

export default function computeDailyAchievement(
  target: Millisecond,
  start: Millisecond,
): DailyAchievement {
  const $target = dayjs(target).startOf('day');
  const $start = dayjs(start).startOf('day');
  let $current = $start;
  const fullYearsReached = $target.diff($current, 'year', false);
  $current = $current.add(fullYearsReached, 'year');
  const fullMonthsAfterYearsReached = $target.diff($current, 'month', false);
  $current = $current.add(fullMonthsAfterYearsReached, 'month');
  const fullDaysAfterMonthsReached = $target.diff($current, 'day', false);
  const fullMonthsReached = $target.diff($start, 'month', false);
  const fullDaysReached = $target.diff($start, 'day', false);
  return {
    fullDaysAfterMonthsReached,
    fullMonthsAfterYearsReached,
    fullDaysReached,
    fullMonthsReached,
    fullYearsReached,
  };
}
