import dayjs, { Dayjs } from "dayjs";

import { Anniversary, TimeUnit } from "./TheWholeDump";
import { Millisecond } from "../Time";

export type AnniversaryDetectionResult = {
  previous?: MemorableDate;
  today?: MemorableDate;
  next?: MemorableDate;
};

export type MemorableDate = {
  timePassed: number;
  anniversary: Anniversary;
};

export function detectAnniversary(
  target: Millisecond,
  dump: { anniversaries: Anniversary[] },
  start: Millisecond,
): AnniversaryDetectionResult {
  const $target = dayjs(target).startOf("day");
  const $start = dayjs(start).startOf("day");

  const timePassedMap = new Map<TimeUnit, number>();

  let previous: Point | undefined;
  let today: MemorableDate | undefined;
  let next: Point | undefined;

  for (const anniversary of dump.anniversaries) {
    let timePassed = timePassedMap.get(anniversary.unit);
    if (timePassed === undefined) {
      timePassed = $target.diff($start, anniversary.unit, true);
      timePassedMap.set(anniversary.unit, timePassed);
    }

    if (anniversary.periodic) {
      const remainder = timePassed % anniversary.value;
      const itIsToday = remainder === 0 && timePassed !== 0;
      if (itIsToday) {
        today = { timePassed, anniversary };
      }

      const _timePassed = timePassed - remainder;
      const higher = _timePassed + anniversary.value;
      updateHigherIfNeeded(higher);

      const lower = itIsToday ? _timePassed - anniversary.value : _timePassed;
      if (lower > 0) {
        updateLowerIfNeeded(lower);
      }
    } else {
      if (timePassed < anniversary.value) {
        updateHigherIfNeeded(anniversary.value);
      } else if (anniversary.value < timePassed) {
        updateLowerIfNeeded(anniversary.value);
      } else {
        today = { timePassed, anniversary };
      }
    }

    function updateHigherIfNeeded(_: number) {
      const $higherDate = $start.add(_, anniversary.unit);
      if (next === undefined || $higherDate.isBefore(next[0])) {
        next = [$higherDate, { timePassed: _, anniversary }];
      }
    }

    function updateLowerIfNeeded(_: number) {
      const $lowerDate = $start.add(_, anniversary.unit);
      if (previous === undefined || $lowerDate.isAfter(previous[0])) {
        previous = [$lowerDate, { timePassed: _, anniversary }];
      }
    }
  }

  return { previous: previous?.[1], today, next: next?.[1] };
}

export type Point = [$date: Dayjs, mem: MemorableDate];
