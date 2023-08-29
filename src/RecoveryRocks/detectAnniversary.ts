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

  const previousRef: Ref<Point> = {};
  let today: MemorableDate | undefined;
  const nextRef: Ref<Point> = {};

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
      updateHigherIfNeeded(higher, $start, anniversary, nextRef);

      const lower = itIsToday ? _timePassed - anniversary.value : _timePassed;
      if (lower > 0) {
        updateLowerIfNeeded(lower, $start, anniversary, previousRef);
      }
    } else {
      if (timePassed < anniversary.value) {
        updateHigherIfNeeded(anniversary.value, $start, anniversary, nextRef);
      } else if (anniversary.value < timePassed) {
        updateLowerIfNeeded(
          anniversary.value,
          $start,
          anniversary,
          previousRef,
        );
      } else {
        today = { timePassed, anniversary };
      }
    }
  }

  return {
    previous: previousRef.current?.[1],
    today,
    next: nextRef.current?.[1],
  };
}

type Point = [$date: Dayjs, mem: MemorableDate];
type Ref<T> = { current?: T };

function updateHigherIfNeeded(
  _: number,
  $start: Dayjs,
  anniversary: Anniversary,
  nextRef: Ref<Point>,
) {
  const $higherDate = $start.add(_, anniversary.unit);
  if (
    nextRef.current === undefined ||
    $higherDate.isBefore(nextRef.current[0])
  ) {
    nextRef.current = [$higherDate, { timePassed: _, anniversary }];
  }
}

function updateLowerIfNeeded(
  _: number,
  $start: Dayjs,
  anniversary: Anniversary,
  previousRef: Ref<Point>,
) {
  const $lowerDate = $start.add(_, anniversary.unit);
  if (
    previousRef.current === undefined ||
    $lowerDate.isAfter(previousRef.current[0])
  ) {
    previousRef.current = [$lowerDate, { timePassed: _, anniversary }];
  }
}
