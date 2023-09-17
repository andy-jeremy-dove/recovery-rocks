import {createContext} from 'react';

import {Theme} from './Theme';
import lightTheme from './lightTheme';

export default createContext<Theme>(lightTheme);
