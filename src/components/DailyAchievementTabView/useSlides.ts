import {useCallback, useMemo} from 'react';

import type {OptionalGetter} from '../../mobx-toolbox';
import {expr, use} from '../../mobx-toolbox';
import type {DailyAchievement} from '../../RecoveryRocks/computeDailyAchievement';
import type {DailyAchievementProps} from './DailyAchievementBinding';
import type {ProgressTabKey} from './DailyAchievementTabViewProps';

export type Slide = {
  key: ProgressTabKey;
  props: DailyAchievementProps;
};

export default function useSlides(
  da: DailyAchievement,
  getTabKey?: OptionalGetter<ProgressTabKey>,
  setTabKey?: (_: ProgressTabKey) => void,
): readonly [
  slides: readonly Slide[],
  getIndex: () => number,
  setIndex: (_: number) => void,
] {
  const slides = useMemo<Slide[]>(() => {
    const result: Slide[] = [
      {
        key: 'accumulative',
        props: {
          years: da.fullYearsReached,
          months: da.fullMonthsAfterYearsReached,
          days: da.fullDaysAfterMonthsReached,
        },
      },
    ];
    if (da.fullMonthsReached !== da.fullMonthsAfterYearsReached) {
      result.push({
        key: 'months',
        props: {months: da.fullMonthsReached},
      });
    }
    if (da.fullDaysReached !== da.fullDaysAfterMonthsReached) {
      result.push({
        key: 'days',
        props: {days: da.fullDaysReached},
      });
    }
    return result;
  }, [da]);

  const getIndex = useCallback(
    () =>
      expr(() => {
        const tabKey = use(getTabKey);
        if (tabKey === undefined) {
          return 0;
        }
        const index = slides.findIndex(_ => _.key === tabKey);
        return index === -1 ? 0 : index;
      }),
    [getTabKey, slides],
  );

  const setIndex = useCallback(
    (_: number) => {
      setTabKey?.(slides[normalizeIndex(_, slides.length - 1)].key);
    },
    [setTabKey, slides],
  );

  return [slides, getIndex, setIndex];
}

function normalizeIndex(_: number, max: number) {
  if (_ < 0) {
    return 0;
  }
  if (_ > max) {
    return max;
  }
  return Math.round(_);
}
