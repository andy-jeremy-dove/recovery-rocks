import {TextStyle} from 'react-native';

export interface Typography {
  /**
   * @deprecated
   * @param weight
   */
  fontByWeight(weight?: FontWeight): TextStyle;
  text(params?: FontParams): TextStyle;
}

export type FontParams = {
  name?: FontName;
  weight?: FontWeight;
};

export type FontName = 'base' | 'time';

export type FontWeight = NonNullable<TextStyle['fontWeight']>;
