import type {Tagged} from '../Opaque';
import type {_Object} from '../Paramut';
import type {Day} from '../Time';

export type TheWholeDump = {
  topics: Topic[];
  fallbackTopic: Topic;
  quotes: Quote[];
  fallbackQuote: Quote;
  anniversaries: Anniversary[];
  cards: MeetingCard[];
  groupLocations: GroupLocation[];
};

export type GroupLocation = {
  id: GroupLocationId;
  name: string;
  address: string;
  schedule: string;
  location: LatLng;
};

declare const GROUP_LOCATION_ID: unique symbol;
export type GroupLocationId = Tagged<string, typeof GROUP_LOCATION_ID>;

export type LatLng = [number, number];

export type MeetingCard<Mut extends boolean = false> = _Object<
  {
    id: MeetingCardId;
    title: string;
    body: string;
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  },
  Mut
>;

declare const MEETING_CARD_ID: unique symbol;
export type MeetingCardId = Tagged<string, typeof MEETING_CARD_ID>;

export type Anniversary = {
  id: AnniversaryId;
  value: number;
  unit: TimeUnit;
  periodic: boolean;
};

declare const ANNIVERSARY_ID: unique symbol;
export type AnniversaryId = Tagged<string, typeof ANNIVERSARY_ID>;

export type TimeUnit = 'day' | 'month' | 'year';

export type Topic = {
  id: TopicId;
  title: string;
  body: string;
} & PeriodicIssue;

declare const TOPIC_ID: unique symbol;
export type TopicId = Tagged<string, typeof TOPIC_ID>;

export type Quote = {
  id: QuoteId;
  body: string;
  source: string;
} & PeriodicIssue;

declare const QUOTE_ID: unique symbol;
export type QuoteId = Tagged<string, typeof QUOTE_ID>;

export type PeriodicIssue = {
  annualDate?: DateStruct;
  daysReached?: Day;
};

export type DateStruct = {
  day: number;
  month: number;
};
