import {useMemo} from 'react';
import type {ViewProps} from 'react-native';
import {StyleSheet, View} from 'react-native';

import TimeUnitView, {Plural, TimeUnit} from './TimeUnitView';

export type DailyAchievementViewProps = ViewProps & {
  days?: number;
  months?: number;
  years?: number;
  accretion?: boolean;
};

export default function DailyAchievementView(props: DailyAchievementViewProps) {
  const {years, months, days, accretion, style, ...rest} = props;
  const daysAreLone = !years && !months;
  const rootStyle = useMemo(() => [layoutStyles.root, style], [style]);
  return (
    <View style={rootStyle} {...rest}>
      {!!years && (
        <TimeUnitView
          value={years}
          unit={TimeUnit.Year}
          plural={Plural.Cardinal}
        />
      )}
      {!!months && (
        <TimeUnitView
          value={months}
          unit={TimeUnit.Month}
          plural={Plural.Cardinal}
        />
      )}
      {daysAreLone ? (
        <TimeUnitView
          value={(days ?? 0) + 1}
          unit={TimeUnit.Day}
          plural={Plural.Ordinal}
          accretion={accretion}
        />
      ) : (
        !!days && (
          <TimeUnitView
            value={days}
            unit={TimeUnit.Day}
            plural={Plural.Cardinal}
          />
        )
      )}
    </View>
  );
}

const layoutStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 32,
  },
});
