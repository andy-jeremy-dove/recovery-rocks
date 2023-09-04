import {createContext} from 'react';

import {Theme} from './Theme';
import ThemeImpl from './ThemeImpl';
import lightPalette from './lightPalette';

export default createContext<Theme>(new ThemeImpl(false, lightPalette));
