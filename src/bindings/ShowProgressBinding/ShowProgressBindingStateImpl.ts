import {comparer, computed} from 'mobx';

import {TimeUnit} from '../../components/TimeUnitView';
import type {CurrentTime} from '../../CurrentTime';
import toTimestamp from '../../DateRecord/toTimestamp';
import type {ProfileStorage} from '../../ProfileStorage';
import {anniversaries} from '../../RecoveryRocks/anniversaries';
import computeDailyAchievement from '../../RecoveryRocks/computeDailyAchievement';
import detectAnniversary from '../../RecoveryRocks/detectAnniversary';
import type {AnniversaryAchievement} from '../../screens/ShowProgressScreen';

export default class ShowProgressBindingStateImpl {
  constructor(
    private readonly _root: {
      readonly currentTime: CurrentTime;
      readonly profileStorage: ProfileStorage;
    },
  ) {}

  @computed
  private get _start() {
    const {start} = this._root.profileStorage.current ?? {};
    if (start === undefined) {
      return undefined;
    }
    return start;
  }

  @computed get today() {
    return this._root.currentTime.wrapped.format('D MMMM YYYY').toLowerCase();
  }

  @computed({equals: comparer.structural}) get dailyAchievement() {
    if (this._start === undefined) {
      return undefined;
    }
    return computeDailyAchievement(
      this._root.currentTime.raw,
      toTimestamp(this._start),
    );
  }

  @computed({equals: comparer.structural}) get anniversaryAchievement() {
    if (this._start === undefined) {
      return undefined;
    }
    const detection = detectAnniversary(
      this._root.currentTime.raw,
      {anniversaries},
      toTimestamp(this._start),
    );
    if (!detection.today) {
      return undefined;
    }
    return {
      previousValue: detection.previous?.timePassed,
      previousUnit:
        detection.previous?.anniversary.unit &&
        timeUnitMap[detection.previous.anniversary.unit],
      currentValue: detection.today.timePassed,
      currentUnit: timeUnitMap[detection.today.anniversary.unit],
      nextValue: detection.next?.timePassed,
      nextUnit:
        detection.next?.anniversary.unit &&
        timeUnitMap[detection.next.anniversary.unit],
    } satisfies AnniversaryAchievement;
  }
}

const timeUnitMap = {
  day: TimeUnit.Day,
  month: TimeUnit.Month,
  year: TimeUnit.Year,
};
