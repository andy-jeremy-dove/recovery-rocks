import {observer} from 'mobx-react-lite';
import React from 'react';

import DailyAchievementView from '../DailyAchievementView';
import ActualDailyAchievementTabView from './ActualDailyAchievementTabView';
import type {DailyAchievementTabViewProps} from './DailyAchievementTabViewProps';

export default observer(function DailyAchievementTabView(
  props: DailyAchievementTabViewProps,
) {
  const {dailyAchievement: da, accretion, ...rest} = props;
  const onlyOneSlidePresent =
    da.fullMonthsReached === da.fullMonthsAfterYearsReached &&
    da.fullDaysReached === da.fullDaysAfterMonthsReached;
  if (onlyOneSlidePresent) {
    return (
      <DailyAchievementView
        days={da.fullDaysAfterMonthsReached}
        months={da.fullMonthsAfterYearsReached}
        years={da.fullYearsReached}
        accretion={accretion}
        {...rest}
      />
    );
  }
  return <ActualDailyAchievementTabView {...props} />;
});
