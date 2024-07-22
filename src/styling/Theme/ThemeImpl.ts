import type {TextStyle} from 'react-native';

import type {Palette} from './Coloring';
import type {Theme} from './Theme';
import type {FontName, FontWeight} from './Typography';

export default class ThemeImpl implements Theme {
  constructor(
    public readonly isDark: boolean,
    public readonly palette: Palette,
    private readonly _fontsByName: FontsByName,
  ) {}

  fontByWeight(_weight: FontWeight = 'normal'): TextStyle {
    const weight = translateWeight(_weight);
    return weight === '400' ? this.text('base') : this.text('time');
  }

  text(name: FontName = 'base'): TextStyle {
    return {fontFamily: this._fontsByName[name]};
  }
}

export type FontsByName = Record<FontName, string>;

export type SupportedWeight = '400' | '800';

function translateWeight(weight: FontWeight): SupportedWeight {
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
