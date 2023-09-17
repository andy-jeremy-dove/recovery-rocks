import ThemeImpl from './ThemeImpl';
import classicPalette from './classicPalette';
import fontsByName from './fontsByName';

export default new ThemeImpl(true, classicPalette, {
  ...fontsByName,
  base: {
    ...fontsByName.base,
    400: 'SourceSerifPro_400Regular',
  },
});
