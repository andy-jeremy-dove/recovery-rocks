import type {ComponentProps} from 'react';
import type {ViewProps, ViewStyle} from 'react-native';
import {Platform} from 'react-native';
import type {
  AnimatableComponent,
  CustomAnimation,
} from 'react-native-animatable';
import {View as AnimatableView} from 'react-native-animatable';

import {variance} from '../styling';

export default variance(AnimatableView)(
  theme => ({
    root: {
      opacity: OPACITY,
      backgroundColor: theme.palette.textPrimary,
    },
  }),
  (): AnimatableViewProps => ({
    animation: fadeInOut,
    duration: 2000,
    iterationCount: 'infinite',
    useNativeDriver: Platform.OS !== 'web',
  }),
);

const OPACITY = 0.05;

const fadeInOut: CustomAnimation = {
  0: {opacity: OPACITY},
  0.5: {opacity: 0.1},
  1: {opacity: OPACITY},
};

type AnimatableViewProps = ComponentProps<
  AnimatableComponent<ViewProps, ViewStyle>
>;
