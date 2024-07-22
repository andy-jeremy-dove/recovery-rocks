import {expect, it} from '@jest/globals';

import type {Day} from '../Time';
import indexContentByDaysReached from './indexContentByDaysReached';
import {dolorQuote, ipsumQuote, loremQuote, quotes} from './quotes';
import {dolorTopic, ipsumTopic, loremTopic, topics} from './topics';

it('indexes given data', () => {
  const index = indexContentByDaysReached({topics, quotes});
  const setOfKeys = new Set(index.keys());
  expect(setOfKeys).toStrictEqual(
    new Set([
      ...topics.map(_ => _.daysReached),
      ...quotes.map(_ => _.daysReached),
    ]) satisfies typeof setOfKeys,
  );
  expect(index).toStrictEqual(
    new Map([
      [0 as Day, {quote: loremQuote, topic: loremTopic}],
      [1 as Day, {quote: ipsumQuote, topic: ipsumTopic}],
      [3 as Day, {quote: dolorQuote}],
      [4 as Day, {topic: dolorTopic}],
    ]) satisfies typeof index,
  );
});
