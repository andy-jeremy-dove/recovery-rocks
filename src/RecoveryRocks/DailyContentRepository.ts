import {Millisecond} from '../Time';
import dayjs from 'dayjs';

export interface DailyContentRepository {}

export type DailyContentQuery = {
  daysHavePassed: number;
  dayOfTheYear: {
    day: number;
    month: number;
  };
};

function createDailyContentQuery(
  start: Millisecond,
  target: Millisecond,
): DailyContentQuery {
  const $start = dayjs(start);
  const $target = dayjs(target);
  const daysHavePassed = $target.diff($start, 'days', false);
  const day = $target.date();
  const month = $target.month();
  return {daysHavePassed, dayOfTheYear: {day, month}};
}
