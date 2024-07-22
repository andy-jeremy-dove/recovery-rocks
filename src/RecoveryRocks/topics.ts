import type {Day} from '../Time';
import type {Topic, TopicId} from './TheWholeDump';

export const loremTopic = {
  id: 'lorem' as TopicId,
  body: 'Lorem body',
  title: 'Lorem title',
  annualDate: {day: 1, month: 0}, // 1st of January
  daysReached: 0 as Day,
} satisfies Topic;

export const ipsumTopic = {
  id: 'ipsum' as TopicId,
  body: 'Ipsum body',
  title: 'Ipsum title',
  annualDate: {day: 10, month: 1}, // 10th of February
  daysReached: 1 as Day,
} satisfies Topic;

export const dolorTopic = {
  id: 'dolor' as TopicId,
  body: 'Dolor body',
  title: 'Dolor title',
  annualDate: {day: 13, month: 3}, // 13th of April
  daysReached: 4 as Day,
} satisfies Topic;

export const topics = [loremTopic, ipsumTopic, dolorTopic] satisfies Topic[];
