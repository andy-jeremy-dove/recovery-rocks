import dayjs from 'dayjs';

import {
  anniversaries,
  oneYear,
  nineMonths,
  eighteenMonths,
  sixMonths,
  thirtiethDay,
  sixtiethDay,
  ninetiethDay,
} from './anniversaries';
import detectAnniversary, {
  AnniversaryDetectionResult,
} from './detectAnniversary';
import {Millisecond} from '../Time';

it('processes the day zero', () => {
  const result = detectAnniversary(start, {anniversaries}, start);
  expect(result).toStrictEqual(zeroResult);
});

it('processes an hour after zero', () => {
  const $target = dayjs('2018-04-13 20:00');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual(zeroResult);
});

it('processes a few days after zero', () => {
  const $target = dayjs('2018-04-26 03:00');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual(zeroResult);
});

it('detects a thirtieth day', () => {
  const $target = dayjs('2018-05-12 13:11');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: undefined,
    today: {timePassed: thirtiethDay.value, anniversary: thirtiethDay},
    next: {timePassed: sixtiethDay.value, anniversary: sixtiethDay},
  });
});

it('processes a few days after the first month', () => {
  const $target = dayjs('2018-05-15 02:44');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: thirtiethDay.value, anniversary: thirtiethDay},
    today: undefined,
    next: {timePassed: sixtiethDay.value, anniversary: sixtiethDay},
  });
});

it('detects a sixtieth day', () => {
  const $target = dayjs('2018-06-11 16:32');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: thirtiethDay.value, anniversary: thirtiethDay},
    today: {timePassed: sixtiethDay.value, anniversary: sixtiethDay},
    next: {timePassed: ninetiethDay.value, anniversary: ninetiethDay},
  });
});

it('processes four months after zero', () => {
  const $target = dayjs('2018-08-02 09:25');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: ninetiethDay.value, anniversary: ninetiethDay},
    today: undefined,
    next: {timePassed: sixMonths.value, anniversary: sixMonths},
  });
});

it('detects six months', () => {
  const $target = dayjs('2018-10-13 10:30');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: ninetiethDay.value, anniversary: ninetiethDay},
    today: {timePassed: sixMonths.value, anniversary: sixMonths},
    next: {timePassed: nineMonths.value, anniversary: nineMonths},
  });
});

it('detects nine months', () => {
  const $target = dayjs('2018-13-13 12:33');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: sixMonths.value, anniversary: sixMonths},
    today: {timePassed: nineMonths.value, anniversary: nineMonths},
    next: {timePassed: oneYear.value, anniversary: oneYear},
  });
});

it('processes a day after nine months', () => {
  const $target = dayjs('2018-13-14 01:56');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: nineMonths.value, anniversary: nineMonths},
    today: undefined,
    next: {timePassed: oneYear.value, anniversary: oneYear},
  });
});

it('detects one year', () => {
  const $target = dayjs('2019-04-13 12:00');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: nineMonths.value, anniversary: nineMonths},
    today: {timePassed: oneYear.value, anniversary: oneYear},
    next: {timePassed: eighteenMonths.value, anniversary: eighteenMonths},
  });
});

it('processes thirteen months', () => {
  const $target = dayjs('2019-05-10 17:55');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: oneYear.value, anniversary: oneYear},
    today: undefined,
    next: {timePassed: eighteenMonths.value, anniversary: eighteenMonths},
  });
});

it('detects eighteen months', () => {
  const $target = dayjs('2019-10-13 15:15');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: oneYear.value, anniversary: oneYear},
    today: {timePassed: eighteenMonths.value, anniversary: eighteenMonths},
    next: {timePassed: oneYear.value * 2, anniversary: oneYear},
  });
});

it('processes twenty months', () => {
  const $target = dayjs('2019-12-31 22:34');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: eighteenMonths.value, anniversary: eighteenMonths},
    today: undefined,
    next: {timePassed: oneYear.value * 2, anniversary: oneYear},
  });
});

it('detects two years', () => {
  const $target = dayjs('2020-04-13 11:00');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: eighteenMonths.value, anniversary: eighteenMonths},
    today: {timePassed: oneYear.value * 2, anniversary: oneYear},
    next: {timePassed: oneYear.value * 3, anniversary: oneYear},
  });
});

it('processes some time after two years', () => {
  const $target = dayjs('2020-08-24 23:16');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: oneYear.value * 2, anniversary: oneYear},
    today: undefined,
    next: {timePassed: oneYear.value * 3, anniversary: oneYear},
  });
});

it('detects three years', () => {
  const $target = dayjs('2021-04-13 11:45');
  const target = $target.valueOf() as Millisecond;
  const result = detectAnniversary(target, {anniversaries}, start);
  expect(result).toStrictEqual({
    previous: {timePassed: oneYear.value * 2, anniversary: oneYear},
    today: {timePassed: oneYear.value * 3, anniversary: oneYear},
    next: {timePassed: oneYear.value * 4, anniversary: oneYear},
  });
});

const $start = dayjs('2018-04-13 19:18');
const start = $start.valueOf() as Millisecond;

const zeroResult: AnniversaryDetectionResult = {
  previous: undefined,
  today: undefined,
  next: {timePassed: thirtiethDay.value, anniversary: thirtiethDay},
};
