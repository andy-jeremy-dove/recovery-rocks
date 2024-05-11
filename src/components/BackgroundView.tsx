import {observer} from 'mobx-react-lite';
import {useId} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {
  Defs,
  NumberProp,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import {OptionalGetter, use} from '../mobx-toolbox';
import {exponentialGradient} from '../styles';
import {useTheme} from '../styling';

export type BackgroundViewProps = {
  getSpecial?: OptionalGetter<boolean | undefined>;
};

export default observer(function BackgroundView(props: BackgroundViewProps) {
  const theme = useTheme();
  const baseId = useId();
  const gradientVisible =
    theme.palette.background !== theme.palette.backgroundGradient;
  const specialGradientVisible =
    theme.palette.background !== theme.palette.backgroundSpecialGradient;
  if (!gradientVisible && !specialGradientVisible) {
    return null;
  }
  return (
    <>
      {gradientVisible && (
        <View style={layoutStyles.topGradientContainer}>
          <Svg
            style={layoutStyles.topGradient}
            width={GRADIENT_WIDTH}
            height={GRADIENT_HEIGHT}>
            <Defs>
              <RadialGradient id={baseId} cx="0.5" cy="0.5" r="0.5">
                <Stop
                  offset="0"
                  stopColor={theme.palette.backgroundGradient}
                  stopOpacity="1"
                />
                <Stop
                  offset="1"
                  stopColor={theme.palette.background}
                  stopOpacity="0"
                />
              </RadialGradient>
            </Defs>
            <Rect
              width={GRADIENT_WIDTH}
              height={GRADIENT_HEIGHT}
              fill={`url(#${baseId})`}
            />
          </Svg>
        </View>
      )}
      {specialGradientVisible && <SpecialGradientFragment {...props} />}
    </>
  );
});

const SpecialGradientFragment = observer(function SpecialGradientFragment(
  props: BackgroundViewProps,
) {
  const {getSpecial} = props;
  const special = use(getSpecial) ?? false;
  return (
    special && (
      <>
        <View style={layoutStyles.topSpecialGradientContainer}>
          <SpecialGradient
            style={layoutStyles.topSpecialGradient}
            size={TOP_SPECIAL_GRADIENT_SIZE}
            ratio={0.7}
            points={3}
          />
        </View>
        <View style={layoutStyles.bottomSpecialGradientContainer}>
          <SpecialGradient
            style={layoutStyles.bottomSpecialGradient}
            size={BOTTOM_SPECIAL_GRADIENT_SIZE}
            ratio={0.65}
            points={2}
          />
        </View>
      </>
    )
  );
});

type SpecialGradientProps = {
  size: NumberProp;
  ratio: number;
  points: number;
  style?: StyleProp<ViewStyle>;
};

const SpecialGradient = observer(function SpecialGradient(
  props: SpecialGradientProps,
) {
  const {size, ratio, points, style} = props;
  const baseId = useId();
  const theme = useTheme();
  const radialStops = exponentialGradient(
    theme.palette.backgroundSpecialGradient,
    1,
    theme.palette.background,
    0,
    ratio,
    points,
  );
  return (
    <Svg width={size} height={size} style={style}>
      <Defs>
        <RadialGradient id={baseId} cx="0.5" cy="0.5" r="0.5">
          {radialStops.map((_, index) => (
            <Stop
              key={index}
              offset={_.offset}
              stopColor={_.color}
              stopOpacity={_.opacity}
            />
          ))}
        </RadialGradient>
      </Defs>
      <Rect width={size} height={size} fill={`url(#${baseId})`} />
    </Svg>
  );
});

const GRADIENT_WIDTH = 350 * 2;
const GRADIENT_HEIGHT = 450 * 2;

const TOP_SPECIAL_GRADIENT_SIZE = 800;
const BOTTOM_SPECIAL_GRADIENT_SIZE = 700;

const layoutStyles = StyleSheet.create({
  topGradientContainer: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  topGradient: {
    marginTop: -GRADIENT_HEIGHT / 2,
  },
  topSpecialGradientContainer: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  topSpecialGradient: {
    marginTop: -TOP_SPECIAL_GRADIENT_SIZE / 2,
  },
  bottomSpecialGradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomSpecialGradient: {
    marginBottom: -BOTTOM_SPECIAL_GRADIENT_SIZE / 2,
  },
});
