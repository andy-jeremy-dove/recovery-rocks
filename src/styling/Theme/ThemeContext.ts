import {createContext} from 'react';

import classicTheme from './classicTheme';
import type {Theme} from './Theme';

export default createContext<Theme>(classicTheme);
