import {createDictionary} from '../../Dictionary';
import type {Palette} from './Coloring';

const darkPalette = Object.freeze(
  createDictionary({
    background: '#2f2f2f',
    backgroundGradient: '#2f2f2f',
    backgroundSpecialGradient: '#2f2f2f',
    textPrimary: '#fff',
    textSecondary: '#fff',
    borderPrimary: '#fff',
    borderSecondary: '#fff',
    backgroundAccent: '#ffffff33',
    backgroundSelection: '#5b5b5b',
    backgroundAverage: '#80808010',
    textAccent: '#fff',
    textHighlight: '#ffd700',
    textShadowHighlight: '#ffffff00',
    textBackground: '#fff',
    link: '#ffd700',
    textSpecter: '#4f4f4f',
  } as const),
) satisfies Palette;

export default darkPalette;
