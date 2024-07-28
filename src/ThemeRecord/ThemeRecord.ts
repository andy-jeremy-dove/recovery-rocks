import type {_Object} from '../Paramut';

export type ThemeRecord<Mut extends boolean = false> = _Object<
  {
    mustObeySystem: boolean;
    fixed: ThemeKind;
    light: LightThemeKind;
    dark: DarkThemeKind;
  },
  Mut
>;

export enum ThemeKind {
  Light,
  Dark,
  Classic,
}

export type LightThemeKind = (typeof _lightThemeKinds)[number];

export type DarkThemeKind = (typeof _darkThemeKinds)[number];

const _lightThemeKinds = [ThemeKind.Light] as const;
export const lightThemeKinds: ReadonlySet<LightThemeKind> = new Set(
  _lightThemeKinds,
);

const _darkThemeKinds = [ThemeKind.Dark, ThemeKind.Classic] as const;
export const darkThemeKinds: ReadonlySet<DarkThemeKind> = new Set(
  _darkThemeKinds,
);
