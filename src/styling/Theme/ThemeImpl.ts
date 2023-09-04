import {TextStyle} from 'react-native';

import {Palette} from './Coloring';
import {FontWeight} from './Fonts';
import {Theme} from './Theme';

export default class ThemeImpl implements Theme {
  constructor(
    public readonly isDark: boolean,
    public readonly palette: Palette,
  ) {}

  fontByWeight(_weight: FontWeight = 'normal'): TextStyle {
    const weight = translateWeight(_weight);
    return {fontFamily: fontByWeightMap[weight]};
  }
}

const fontByWeightMap = {
  400: 'Inter_400Regular',
  800: 'Inter_800ExtraBold',
};

function translateWeight(weight: FontWeight): '400' | '800' {
  switch (weight) {
    case '100':
    case '200':
    case '300':
    case '400':
    case '500':
    case '600':
    case 'normal':
      return '400';
    default:
      return '800';
  }
}
