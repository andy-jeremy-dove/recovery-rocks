import type {ViewProps} from 'react-native';

import type {OptionalGetter} from '../../mobx-toolbox';
import type {DailyAchievement} from '../../RecoveryRocks/computeDailyAchievement';

export type DailyAchievementTabViewProps = {
  getTabKey?: OptionalGetter<ProgressTabKey>;
  setTabKey?: (_: ProgressTabKey) => void;
  getIsFocused?: OptionalGetter<boolean>;
  dailyAchievement: DailyAchievement;
  accretion?: boolean;
} & ViewProps;

export type ProgressTabKey = 'accumulative' | 'months' | 'days';
