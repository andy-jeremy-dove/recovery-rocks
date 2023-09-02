import { useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import TimeUnitView, { Plural, TimeUnit } from "./TimeUnitView";

export type DailyAchievementViewProps = ViewProps & {
  fullDaysReached?: number;
  fullMonthsReached?: number;
  fullYearsReached?: number;
  accretion?: boolean;
};

export default function DailyAchievementView(props: DailyAchievementViewProps) {
  const {
    fullYearsReached,
    fullMonthsReached,
    fullDaysReached,
    accretion,
    style,
    ...rest
  } = props;
  const daysAreLone = !fullYearsReached && !fullMonthsReached;
  const rootStyle = useMemo(() => [layoutStyles.root, style], [style]);
  return (
    <View style={rootStyle} {...rest}>
      {!!fullYearsReached && (
        <TimeUnitView
          value={fullYearsReached}
          unit={TimeUnit.Year}
          plural={Plural.Cardinal}
        />
      )}
      {!!fullMonthsReached && (
        <TimeUnitView
          value={fullMonthsReached}
          unit={TimeUnit.Month}
          plural={Plural.Cardinal}
        />
      )}
      {daysAreLone ? (
        <TimeUnitView
          value={(fullDaysReached ?? 0) + 1}
          unit={TimeUnit.Day}
          plural={Plural.Ordinal}
          accretion={accretion}
        />
      ) : (
        !!fullDaysReached && (
          <TimeUnitView
            value={fullDaysReached}
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 32,
  },
});
