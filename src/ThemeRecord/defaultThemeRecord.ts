import {ThemeKind, type ThemeRecord} from './ThemeRecord';

export default Object.freeze({
  mustObeySystem: false,
  fixed: ThemeKind.Classic,
  light: ThemeKind.Light,
  dark: ThemeKind.Dark,
} satisfies ThemeRecord);
