import dayjs from "dayjs";

import { createDateTag, DateTag } from "./DateTag";
import { DailyContent } from "./Indexes";
import { Millisecond } from "../Time";

export default function getDailyContent(
  target: Millisecond,
  indexes: {
    dailyContentByDaysReached: Map<number, DailyContent>;
    dailyContentByAnnualDate: Map<DateTag, DailyContent>;
  },
  start: Millisecond,
): DailyContent {
  const $target = dayjs(target).startOf("day");
  const $start = dayjs(start).startOf("day");
  const daysReached = $target.diff($start, "days", false);
  const day = $target.date();
  const month = $target.month();
  let byAnnualDate: DailyContent | undefined;
  try {
    byAnnualDate = indexes.dailyContentByAnnualDate.get(
      createDateTag(day, month),
    );
  } catch {}
  const byDaysReached = indexes.dailyContentByDaysReached.get(daysReached);
  return {
    quote: byDaysReached?.quote ?? byAnnualDate?.quote,
    topic: byDaysReached?.topic ?? byAnnualDate?.topic,
  };
}
