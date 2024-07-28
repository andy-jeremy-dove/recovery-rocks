import {computed} from 'mobx';

import {ColorScheme} from '../Appearance';
import type {AppearanceState} from '../AppearanceState';
import {createDictionary} from '../Dictionary';
import type {Theme} from '../styling';
import classicTheme from '../styling/Theme/classicTheme';
import darkTheme from '../styling/Theme/darkTheme';
import lightTheme from '../styling/Theme/lightTheme';
import {ThemeKind} from '../ThemeRecord';
import type {ThemeStorage} from '../ThemeStorage';
import type {ThemeState} from './ThemeState';

export default class ThemeStateImpl implements ThemeState {
  constructor(
    private readonly _root: {
      readonly appearanceState: AppearanceState;
      readonly themeStorage: ThemeStorage;
    },
  ) {}

  @computed get initialized() {
    return this._root.themeStorage.current !== undefined;
  }

  @computed get theme(): Theme {
    const record = this._root.themeStorage.current;
    if (!record) {
      return classicTheme;
    }
    if (!record.mustObeySystem) {
      return themeByKind[record.fixed];
    }
    const {colorScheme} = this._root.appearanceState;
    const kind = colorScheme === ColorScheme.Dark ? record.dark : record.light;
    return themeByKind[kind];
  }
}

const themeByKind = Object.freeze(
  createDictionary({
    [ThemeKind.Light]: lightTheme,
    [ThemeKind.Dark]: darkTheme,
    [ThemeKind.Classic]: classicTheme,
  } as const),
);
