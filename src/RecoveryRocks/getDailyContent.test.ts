import {expect, it} from '@jest/globals';
import dayjs from 'dayjs';

import type {Millisecond} from '../Time';
import getDailyContent from './getDailyContent';
import indexContentByAnnualDate from './indexContentByAnnualDate';
import indexContentByDaysReached from './indexContentByDaysReached';
import type {DailyContent} from './Indexes';
import {ipsumQuote, loremQuote, quotes} from './quotes';
import {dolorTopic, ipsumTopic, loremTopic, topics} from './topics';

it('computes daily content for the day zero', () => {
  const daily = getDailyContent(start, indexes, start);
  expect(daily).toStrictEqual(dayZeroContent);
});

it('computes daily content for the same day', () => {
  const $target = dayjs('2018-04-13 20:00');
  const target = $target.valueOf() as Millisecond;
  const daily = getDailyContent(target, indexes, start);
  expect(daily).toStrictEqual(dayZeroContent);
});

it('computes daily content for the next day', () => {
  const $target = dayjs('2018-04-14 07:00');
  const target = $target.valueOf() as Millisecond;
  const daily = getDailyContent(target, indexes, start);
  expect(daily).toStrictEqual(dayOneContent);
});

it('computes daily content for the exact date', () => {
  const $target = dayjs('2019-04-13 07:00');
  const target = $target.valueOf() as Millisecond;
  const daily = getDailyContent(target, indexes, start);
  expect(daily).toStrictEqual({topic: dolorTopic} satisfies typeof daily);
});

it('prioritizes days reached over exact date', () => {
  const $anotherStart = dayjs('2018-02-10 12:26');
  const anotherStart = $anotherStart.valueOf() as Millisecond;
  const daily = getDailyContent(anotherStart, indexes, anotherStart);
  expect(daily).toStrictEqual(dayZeroContent);
});

const dayZeroContent = {
  quote: loremQuote,
  topic: loremTopic,
} satisfies DailyContent;

const dayOneContent = {
  quote: ipsumQuote,
  topic: ipsumTopic,
} satisfies DailyContent;

const dump = {quotes, topics};

const indexes = {
  dailyContentByDaysReached: indexContentByDaysReached(dump),
  dailyContentByAnnualDate: indexContentByAnnualDate(dump),
};

const $start = dayjs('2018-04-13 19:18');
const start = $start.valueOf() as Millisecond;
