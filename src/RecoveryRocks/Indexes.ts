import type {DateTag} from '../Date';
import type {Day} from '../Time';
import type {Quote, Topic} from './TheWholeDump';

export type Indexes = {
  dailyContentByDaysReached: Map<Day, DailyContent>;
  dailyContentByAnnualDate: Map<DateTag, DailyContent>;
};

export type DailyContent = {
  topic?: Topic;
  quote?: Quote;
};
