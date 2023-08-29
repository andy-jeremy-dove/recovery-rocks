import {DailyContent} from './Indexes';
import {createDateTag, DateTag} from './DateTag';
import {Millisecond} from '../Time';
import dayjs from 'dayjs';

export default function getDailyContent(
  target: Millisecond,
  indexes: {
    dailyContentByDaysReached: Map<number, DailyContent>;
    dailyContentByAnnualDate: Map<DateTag, DailyContent>;
  },
  start: Millisecond,
): DailyContent {
  const $target = dayjs(target).startOf('day');
  const $start = dayjs(start).startOf('day');
  const daysReached = $target.diff($start, 'days', false);
  const day = $target.date();
  const month = $target.month();
  let byAnnualDate: DailyContent | undefined;
  try {
    byAnnualDate = indexes.dailyContentByAnnualDate.get(
      createDateTag(day, month),
    );
  } catch (ignore) {}
  const byDaysReached = indexes.dailyContentByDaysReached.get(daysReached);
  return {
    quote: byDaysReached?.quote ?? byAnnualDate?.quote,
    topic: byDaysReached?.topic ?? byAnnualDate?.topic,
  };
}
