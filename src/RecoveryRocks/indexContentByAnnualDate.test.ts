import {expect, it} from '@jest/globals';

import {createDateTag} from '../Date';
import indexContentByAnnualDate from './indexContentByAnnualDate';
import {dolorQuote, ipsumQuote, loremQuote, quotes} from './quotes';
import {dolorTopic, ipsumTopic, loremTopic, topics} from './topics';

it('indexes given data', () => {
  const index = indexContentByAnnualDate({topics, quotes});
  const setOfKeys = new Set(index.keys());
  expect(setOfKeys).toStrictEqual(
    new Set([
      ...topics.map(_ => createDateTag(_.annualDate.day, _.annualDate.month)),
      ...quotes.map(_ => createDateTag(_.annualDate.day, _.annualDate.month)),
    ]) satisfies typeof setOfKeys,
  );
  expect(index).toStrictEqual(
    new Map([
      ['1/0', {quote: loremQuote, topic: loremTopic}],
      ['10/1', {quote: ipsumQuote, topic: ipsumTopic}],
      ['11/1', {quote: dolorQuote}],
      ['13/3', {topic: dolorTopic}],
    ]) satisfies typeof index,
  );
});
