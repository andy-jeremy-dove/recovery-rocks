import {createDictionary} from '../../Dictionary';
import type {Palette} from './Coloring';

const lightPalette = Object.freeze(
  createDictionary({
    background: '#fff',
    backgroundGradient: '#fff',
    backgroundSpecialGradient: '#fff',
    textPrimary: '#000',
    textSecondary: '#c0c0c0',
    borderPrimary: '#848484',
    borderSecondary: '#ebebeb',
    backgroundAccent: '#00000033',
    backgroundSelection: '#ebebeb',
    backgroundAverage: '#80808010',
    textAccent: '#fff',
    textHighlight: '#25428b',
    textShadowHighlight: '#00000000',
    textBackground: '#000',
    link: '#25428b',
    textSpecter: '#b8b8b8',
  } as const),
) satisfies Palette;

export default lightPalette;
