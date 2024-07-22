import type {Day} from '../Time';
import type {DailyContent} from './Indexes';
import type {Quote, Topic} from './TheWholeDump';

export default function indexContentByDaysReached(dump: {
  readonly topics: Topic[];
  readonly quotes: Quote[];
}): Map<Day, DailyContent> {
  const map = new Map<Day, DailyContent>();
  for (const topic of dump.topics) {
    const {daysReached} = topic;
    if (daysReached !== undefined) {
      map.set(daysReached, {topic});
    }
  }
  for (const quote of dump.quotes) {
    const {daysReached} = quote;
    if (daysReached !== undefined) {
      const content = map.get(daysReached);
      if (content) {
        content.quote = quote;
      } else {
        map.set(daysReached, {quote});
      }
    }
  }
  return map;
}
