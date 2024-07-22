import chroma from 'chroma-js';
import type {ColorValue} from 'react-native';

export type GradientPoint = {
  /**
   * [0; 1]
   */
  offset: number;
  color: ColorValue;
  /**
   * [0; 1]
   */
  opacity: number;
};

/**
 * Compute linear gradient points to emulate an exponential gradient
 * @param fromColor
 * @param fromOpacity `[0; 1]`
 * @param toColor
 * @param toOpacity `[0; 1]`
 * @param ratio `(0; 1)`
 * @param interimPoints
 */
export default function exponentialGradient(
  fromColor: ColorValue,
  fromOpacity: number,
  toColor: ColorValue,
  toOpacity: number,
  ratio = GOLDEN_RATIO_RECIPROCAL,
  interimPoints = 1,
): [GradientPoint, ...GradientPoint[], GradientPoint] {
  const start: GradientPoint = {
    offset: 0,
    color: fromColor,
    opacity: fromOpacity,
  };
  const stop: GradientPoint = {offset: 1, color: toColor, opacity: toOpacity};
  if (
    (fromColor === toColor && fromOpacity === toOpacity) ||
    interimPoints <= 0
  ) {
    return [start, stop];
  }
  const gradient = chroma
    .scale([fromColor as string, toColor as string])
    .cache(false)
    .mode('lrgb')
    .colors(interimPoints + 2, 'hex');
  const internal: GradientPoint[] = [];
  for (let i = 0; i < interimPoints; i++) {
    const point = i + 1;
    const color = gradient[point];
    const opacityRatio = (1 / (interimPoints + 1)) * point;
    const opacity = fromOpacity + (toOpacity - fromOpacity) * opacityRatio;
    const offset = 1 - ratio ** point;
    internal.push({offset, color, opacity});
  }
  return [start, ...internal, stop];
}

export const GOLDEN_RATIO_RECIPROCAL = (Math.sqrt(5) - 1) / 2;
