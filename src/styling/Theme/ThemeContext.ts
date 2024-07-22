import {createContext} from 'react';

import lightTheme from './lightTheme';
import type {Theme} from './Theme';

export default createContext<Theme>(lightTheme);
