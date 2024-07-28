import {createDictionary} from '../../Dictionary';
import type {Palette} from './Coloring';

const classicPalette = Object.freeze(
  createDictionary({
    background: '#132255',
    backgroundGradient: '#263379',
    backgroundSpecialGradient: '#0068C8',
    textPrimary: '#fff',
    textSecondary: '#fff',
    borderPrimary: '#fff',
    borderSecondary: '#fff',
    backgroundAccent: '#00000055',
    backgroundSelection: '#0068C8',
    backgroundAverage: '#80808010',
    textAccent: '#fff',
    textHighlight: '#fff',
    textShadowHighlight: '#fff',
    textBackground: '#000',
    link: '#ffd700',
    textSpecter: '#4f4f4f',
  } as const),
) satisfies Palette;

export default classicPalette;
