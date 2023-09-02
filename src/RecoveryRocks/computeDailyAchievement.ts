import dayjs from "dayjs";

import { Millisecond } from "../Time";

export type DailyAchievement = {
  fullDaysReached: number;
  fullMonthsReached: number;
  fullYearsReached: number;
};

export default function computeDailyAchievement(
  target: Millisecond,
  start: Millisecond,
): DailyAchievement {
  const $target = dayjs(target).startOf("day");
  let $current = dayjs(start).startOf("day");
  const fullYearsReached = $target.diff($current, "year", false);
  $current = $current.add(fullYearsReached, "year");
  const fullMonthsReached = $target.diff($current, "month", false);
  $current = $current.add(fullMonthsReached, "month");
  const fullDaysReached = $target.diff($current, "day", false);
  return {
    fullDaysReached,
    fullMonthsReached,
    fullYearsReached,
  };
}
