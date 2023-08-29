import React, {PropsWithChildren} from 'react';
import ThemeContext from './ThemeContext';
import {Theme} from './Theme';

type ThemeProviderProps = {
  theme: Theme;
};

export default function ThemeProvider(
  props: PropsWithChildren<ThemeProviderProps>,
) {
  const {theme, ...rest} = props;
  return <ThemeContext.Provider value={theme} {...rest} />;
};
