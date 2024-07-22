import type {Day} from '../Time';
import type {Quote, QuoteId} from './TheWholeDump';

export const loremQuote = {
  id: 'lorem' as QuoteId,
  body: 'Lorem body',
  source: 'Lorem source',
  annualDate: {day: 1, month: 0}, // 1st of January
  daysReached: 0 as Day,
} satisfies Quote;

export const ipsumQuote = {
  id: 'ipsum' as QuoteId,
  body: 'Ipsum body',
  source: 'Lorem source',
  annualDate: {day: 10, month: 1}, // 10th of February
  daysReached: 1 as Day,
} satisfies Quote;

export const dolorQuote = {
  id: 'dolor' as QuoteId,
  body: 'Dolor body',
  source: 'Dolor source',
  annualDate: {day: 11, month: 1}, // 11th of February
  daysReached: 3 as Day,
} satisfies Quote;

export const quotes = [loremQuote, ipsumQuote, dolorQuote] satisfies Quote[];
