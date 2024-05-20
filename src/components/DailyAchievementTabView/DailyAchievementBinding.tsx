import {observer} from 'mobx-react-lite';
import React from 'react';
import {Pressable} from 'react-native';

import DailyAchievementView from '../DailyAchievementView';

export type DailyAchievementBindingProps = DailyAchievementProps &
  TabsContextProps;

export type DailyAchievementProps = {
  days?: number;
  months?: number;
  years?: number;
};

export type TabsContextProps = {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  accretion?: boolean;
};

export default observer(function DailyAchievementBinding(
  props: DailyAchievementBindingProps,
) {
  const {days, months, years, accretion, onPress, onPressIn, onPressOut} =
    props;
  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <DailyAchievementView
        pointerEvents="box-only"
        days={days}
        months={months}
        years={years}
        accretion={accretion}
      />
    </Pressable>
  );
});
