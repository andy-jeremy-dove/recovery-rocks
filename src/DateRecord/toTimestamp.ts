import dayjs from 'dayjs';

import type {Millisecond} from '../Time';
import type {DateRecord} from './DateRecord';

export default function toTimestamp(_: DateRecord): Millisecond {
  return dayjs()
    .year(_.year)
    .month(_.month)
    .date(_.day)
    .startOf('day')
    .valueOf() as Millisecond;
}
