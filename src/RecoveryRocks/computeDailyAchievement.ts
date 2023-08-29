import dayjs from "dayjs";

import { Millisecond } from "../Time";

export type DailyAchievement = {
  fullDaysReached: number;
  fullMonthsReached: number;
  fullYearsReached: number;
};

export function computeDailyAchievement(
  target: Millisecond,
  start: Millisecond,
): DailyAchievement {
  const $target = dayjs(target).startOf("day");
  const $start = dayjs(start).startOf("day");

  let $current = $start;
  const fullYearsReached = $target.diff($current, "year", false);
  $current = $start.add(fullYearsReached, "year");
  const fullMonthsReached = $target.diff($current, "month", false);
  $current = $start.add(fullMonthsReached, "month");
  const fullDaysReached = $target.diff($current, "day", false);
  return {
    fullDaysReached,
    fullMonthsReached,
    fullYearsReached,
  };
}
