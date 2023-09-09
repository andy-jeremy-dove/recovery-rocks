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

export const GROUP_LOCATION_ID = Symbol();
export type GroupLocationId = Opaque<string, typeof GROUP_LOCATION_ID>;

export type LatLng = [number, number];

export type MeetingCard = {
  id: MeetingCardId;
  title: string;
  body: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
};

export const MEETING_CARD_ID = Symbol();
export type MeetingCardId = Opaque<string, typeof MEETING_CARD_ID>;

export type Anniversary = {
  id: AnniversaryId;
  value: number;
  unit: TimeUnit;
  periodic: boolean;
};

export const ANNIVERSARY_ID = Symbol();
export type AnniversaryId = Opaque<string, typeof ANNIVERSARY_ID>;

export type TimeUnit = 'day' | 'month' | 'year';

export type Topic = {
  id: TopicId;
  title: string;
  body: string;
} & PeriodicIssue;

export const TOPIC_ID = Symbol();
export type TopicId = Opaque<string, typeof TOPIC_ID>;

export type Quote = {
  id: QuoteId;
  body: string;
  source: string;
} & PeriodicIssue;

export const QUOTE_ID = Symbol();
export type QuoteId = Opaque<string, typeof QUOTE_ID>;

export type PeriodicIssue = {
  annualDate?: DateStruct;
  daysReached?: number;
};

export type DateStruct = {
  day: number;
  month: number;
};

export type Opaque<T, TT> = T extends {
  readonly __opaque: infer Rest extends any[];
}
  ? Omit<T, '__opaque'> & {readonly __opaque: [...Rest, TT]}
  : T & {readonly __opaque: [TT]};
