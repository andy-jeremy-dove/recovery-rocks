import {TextStyle} from 'react-native';

import {Palette} from './Coloring';
import {Theme} from './Theme';
import {FontName, FontParams, FontWeight} from './Typography';

export default class ThemeImpl implements Theme {
  constructor(
    public readonly isDark: boolean,
    public readonly palette: Palette,
    private readonly _fontsByName: FontsByName,
  ) {}

  fontByWeight(_weight: FontWeight = 'normal'): TextStyle {
    return this.text({weight: _weight});
  }

  text(params?: FontParams): TextStyle {
    const {name = 'base', weight: _weight = 'normal'} = params ?? {};
    const weight = translateWeight(_weight);
    return {fontFamily: this._fontsByName[name][weight]};
  }
}

export type FontsByName = Record<FontName, FontByWeight>;

export type SupportedWeight = '400' | '800';

export type FontByWeight = Record<SupportedWeight, string>;

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
