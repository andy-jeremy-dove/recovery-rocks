import dayjs from 'dayjs';

import type {DateTag} from '../Date';
import {createDateTag} from '../Date';
import type {Day, Millisecond} from '../Time';
import type {DailyContent} from './Indexes';

export default function getDailyContent(
  target: Millisecond,
  indexes: {
    readonly dailyContentByDaysReached: Map<Day, DailyContent>;
    readonly dailyContentByAnnualDate: Map<DateTag, DailyContent>;
  },
  start: Millisecond,
): DailyContent | undefined {
  const $target = dayjs(target).startOf('day');
  const $start = dayjs(start).startOf('day');
  const daysReached = $target.diff($start, 'days', false) as Day;
  const byDaysReached = indexes.dailyContentByDaysReached.get(daysReached);
  if (byDaysReached?.quote && byDaysReached.topic) {
    return byDaysReached;
  }

  const day = $target.date();
  const month = $target.month();
  let byAnnualDate: DailyContent | undefined;
  try {
    byAnnualDate = indexes.dailyContentByAnnualDate.get(
      createDateTag(day, month),
    );
  } catch {
    /* empty */
  }
  const quote = byDaysReached?.quote ?? byAnnualDate?.quote;
  const topic = byDaysReached?.topic ?? byAnnualDate?.topic;
  if (!quote && !topic) {
    return undefined;
  }
  const result: DailyContent = {};
  if (quote) {
    result.quote = quote;
  }
  if (topic) {
    result.topic = topic;
  }
  return result;
}
