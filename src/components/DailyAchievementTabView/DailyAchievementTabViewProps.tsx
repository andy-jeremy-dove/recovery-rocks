import {ViewProps} from 'react-native';

import {DailyAchievement} from '../../RecoveryRocks/computeDailyAchievement';
import {OptionalGetter} from '../../mobx-toolbox';

export type DailyAchievementTabViewProps = {
  getTabKey?: OptionalGetter<ProgressTabKey>;
  setTabKey?: (_: ProgressTabKey) => void;
  dailyAchievement: DailyAchievement;
  accretion?: boolean;
} & ViewProps;

export type ProgressTabKey = 'accumulative' | 'months' | 'days';
