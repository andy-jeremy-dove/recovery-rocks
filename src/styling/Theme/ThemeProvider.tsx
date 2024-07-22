import type {PropsWithChildren} from 'react';
import React from 'react';

import type {Theme} from './Theme';
import ThemeContext from './ThemeContext';

type ThemeProviderProps = {
  theme: Theme;
};

export default function ThemeProvider(
  props: PropsWithChildren<ThemeProviderProps>,
) {
  const {theme, ...rest} = props;
  return <ThemeContext.Provider value={theme} {...rest} />;
}
