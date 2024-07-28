import type {Observable} from '../structure';

export interface Appearance {
  readonly colorScheme: Observable<ColorScheme | undefined>;
}

export enum ColorScheme {
  Light,
  Dark,
}
