import {TextStyle} from 'react-native';

export interface Fonts {
  fontByWeight(weight?: FontWeight): TextStyle;
}

export type FontWeight = NonNullable<TextStyle['fontWeight']>;
