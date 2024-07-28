import dayjs from 'dayjs';

import type {Millisecond} from '../Time';
import type {NaturalRange} from '../util/Range';
import type {DateRecord} from './DateRecord';

export default function fromTimestamp(__: Millisecond): DateRecord<true> {
  const _ = dayjs(__);
  if (!_.isValid()) {
    throw new RangeError('Invalid date');
  }
  return {
    day: _.date() as NaturalRange<31>,
    month: _.month(),
    year: _.year(),
  };
}
