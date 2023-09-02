import { useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

import TimeUnitView, { Plural, TimeUnit } from "./TimeUnitView";
import TrinketSvg from "../../assets/bdp22.svg";
import { useStyles, useTheme } from "../styling";

export type AnniversaryAchievementViewProps = ViewProps & {
  previousValue?: number;
  previousUnit?: TimeUnit;
  currentValue?: number;
  currentUnit?: TimeUnit;
  nextValue?: number;
  nextUnit?: TimeUnit;
  accretion?: boolean;
};

export default function AnniversaryAchievementView(
  props: AnniversaryAchievementViewProps,
) {
  const {
    previousValue,
    previousUnit,
    currentValue,
    currentUnit,
    nextValue,
    nextUnit,
    accretion,
    style,
    ...rest
  } = props;
  const styles = useStyles((theme) => ({
    current: {
      color: theme.palette.textHighlight,
    },
    other: {
      color: theme.palette.textBackground,
    },
  }));
  const rootStyle = useMemo(() => [layoutStyles.root, style], [style]);
  return (
    <View style={rootStyle} {...rest}>
      <View style={layoutStyles.base}>
        {previousValue !== undefined && previousUnit !== undefined && (
          <View style={[layoutStyles.specter, layoutStyles.previous]}>
            <ValueView
              value={previousValue}
              unit={previousUnit}
              imageStyle={layoutStyles.larger}
              accretion={accretion}
              scale={LARGER}
              valueTextStyle={styles.other}
            />
          </View>
        )}
        {nextValue !== undefined && nextUnit !== undefined && (
          <View style={[layoutStyles.specter, layoutStyles.next]}>
            <ValueView
              value={nextValue}
              unit={nextUnit}
              imageStyle={layoutStyles.smaller}
              accretion={accretion}
              scale={SMALLER}
              valueTextStyle={styles.other}
            />
          </View>
        )}
        {currentValue !== undefined && currentUnit !== undefined && (
          <ValueView
            value={currentValue}
            unit={currentUnit}
            accretion={accretion}
            valueTextStyle={styles.current}
          />
        )}
      </View>
    </View>
  );
}

const WIDTH = 133;
const HEIGHT = 259;

const LARGER = 1.359;
const SMALLER = 0.678;

const OFFSET = 50;

const layoutStyles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  base: {
    width: 300,
    height: 108,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  specter: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.1,
  },
  previous: {
    top: 10,
    left: -190,
  },
  next: {
    top: 0,
    right: -130,
  },
  image: {
    position: "absolute",
    left: "50%",
    right: "50%",
    top: "50%",
    bottom: "50%",
    ...scaledImage(),
  },
  larger: scaledImage(LARGER),
  smaller: scaledImage(SMALLER),
});

function scaledImage(scale: number = 1): ViewStyle {
  return {
    width: WIDTH * scale,
    height: HEIGHT * scale,
    marginLeft: (-WIDTH / 2) * scale,
    marginTop: (-HEIGHT / 2 - OFFSET) * scale,
  };
}

type ValueViewProps = ViewProps & {
  value: number;
  unit: TimeUnit;
  imageStyle?: StyleProp<ViewStyle>;
  valueTextStyle?: StyleProp<TextStyle>;
  accretion?: boolean;
  scale?: number;
};

function ValueView(props: ValueViewProps) {
  const { value, unit, accretion, imageStyle, valueTextStyle, scale, ...rest } =
    props;
  const theme = useTheme();
  const style = useMemo(
    () => StyleSheet.flatten([layoutStyles.image, imageStyle]),
    [imageStyle],
  );
  return (
    <View {...rest}>
      <View style={StyleSheet.absoluteFill}>
        <TrinketSvg
          width={WIDTH * (scale ?? 1)}
          height={HEIGHT * (scale ?? 1)}
          color={theme.palette.textBackground}
          style={style}
        />
      </View>
      <TimeUnitView
        value={value + (unit === TimeUnit.Day ? 1 : 0)}
        unit={unit}
        plural={unit === TimeUnit.Day ? Plural.Ordinal : Plural.Cardinal}
        accretion={accretion}
        scale={scale}
        valueTextStyle={valueTextStyle}
      />
    </View>
  );
}