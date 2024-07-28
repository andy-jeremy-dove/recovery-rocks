import {
  type LightThemeKind,
  lightThemeKinds,
  type ThemeKind,
} from './ThemeRecord';

export default function isLightThemeKind(_: ThemeKind): _ is LightThemeKind {
  return lightThemeKinds.has(_ as number);
}
