import {useMemo} from 'react';
import type {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import type {Theme} from '../Theme';
import {useTheme} from '../Theme';

export default function createStylesHook<
  T extends
    | StyleSheet.NamedStyles<T>
    | {[P in string | number]: ViewStyle | TextStyle | ImageStyle},
>(factory: (theme: Theme) => T | StyleSheet.NamedStyles<T>) {
  return (): T => {
    const theme = useTheme();
    return useMemo(() => factory(theme) as T, [theme]);
  };
}
