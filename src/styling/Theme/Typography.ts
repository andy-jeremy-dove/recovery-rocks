import type {TextStyle} from 'react-native';

export interface Typography {
  /**
   * @deprecated Use Typography#text instead
   * @param weight
   */
  fontByWeight(weight?: FontWeight): TextStyle;
  text(name?: FontName): TextStyle;
}

export type FontName = 'base' | 'time' | 'quoteBody';

export type FontWeight = NonNullable<TextStyle['fontWeight']>;
