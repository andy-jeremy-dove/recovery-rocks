import {createDateTag, type DateTag} from '../Date';
import type {DailyContent} from './Indexes';
import type {Quote, Topic} from './TheWholeDump';

export default function indexContentByAnnualDate(dump: {
  readonly topics: Topic[];
  readonly quotes: Quote[];
}): Map<DateTag, DailyContent> {
  const map = new Map<DateTag, DailyContent>();
  for (const topic of dump.topics) {
    const {annualDate} = topic;
    if (!annualDate) {
      continue;
    }
    const {day, month} = annualDate;
    let dateTag;
    try {
      dateTag = createDateTag(day, month);
    } catch {
      continue;
    }
    map.set(dateTag, {topic});
  }
  for (const quote of dump.quotes) {
    const {annualDate} = quote;
    if (!annualDate) {
      continue;
    }
    const {day, month} = annualDate;
    let dateTag;
    try {
      dateTag = createDateTag(day, month);
    } catch {
      continue;
    }
    const content = map.get(dateTag);
    if (content) {
      content.quote = quote;
    } else {
      map.set(dateTag, {quote});
    }
  }
  return map;
}
