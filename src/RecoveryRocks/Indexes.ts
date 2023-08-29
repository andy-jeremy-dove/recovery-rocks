import { createDateTag, DateTag } from "./DateTag";
import { Quote, Topic } from "./TheWholeDump";

export type Indexes = {
  dailyContentByDaysReached: Map<number, DailyContent>;
  dailyContentByAnnualDate: Map<DateTag, DailyContent>;
};

export type DailyContent = {
  topic?: Topic;
  quote?: Quote;
};

export function indexContentByDaysReached(dump: {
  topics: Topic[];
  quotes: Quote[];
}) {
  const map = new Map<number, DailyContent>();
  for (const topic of dump.topics) {
    const { daysReached } = topic;
    if (daysReached !== undefined) {
      map.set(daysReached, { topic });
    }
  }
  for (const quote of dump.quotes) {
    const { daysReached } = quote;
    if (daysReached !== undefined) {
      if (map.has(daysReached)) {
        const content = map.get(daysReached)!;
        content.quote = quote;
      } else {
        map.set(daysReached, { quote });
      }
    }
  }
  return map;
}

export function indexContentByAnnualDate(dump: {
  topics: Topic[];
  quotes: Quote[];
}) {
  const map = new Map<DateTag, DailyContent>();
  for (const topic of dump.topics) {
    const { annualDate } = topic;
    if (!annualDate) {
      continue;
    }
    const { day, month } = annualDate;
    let dateTag;
    try {
      dateTag = createDateTag(day, month);
    } catch {
      continue;
    }
    map.set(dateTag, { topic });
  }
  for (const quote of dump.quotes) {
    const { annualDate } = quote;
    if (!annualDate) {
      continue;
    }
    const { day, month } = annualDate;
    let dateTag;
    try {
      dateTag = createDateTag(day, month);
    } catch {
      continue;
    }
    if (map.has(dateTag)) {
      const content = map.get(dateTag)!;
      content.quote = quote;
    } else {
      map.set(dateTag, { quote });
    }
  }
  return map;
}
