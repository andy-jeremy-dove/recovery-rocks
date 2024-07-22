import classicPalette from './classicPalette';
import fontsByName from './fontsByName';
import ThemeImpl from './ThemeImpl';

export default new ThemeImpl(true, classicPalette, {
  ...fontsByName,
  base: 'SourceSerifPro_400Regular',
  time: 'Inter_800ExtraBold',
  quoteBody: 'SourceSerifPro_400Regular_Italic',
});
