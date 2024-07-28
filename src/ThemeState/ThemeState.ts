import type {Theme} from '../styling';

export interface ThemeState {
  readonly initialized: boolean;
  readonly theme: Theme;
}
