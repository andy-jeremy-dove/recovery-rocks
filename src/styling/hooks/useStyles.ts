import type {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import type {Theme} from '../Theme';
import createStylesHook from './createStylesHook';

export default function useStyles<
  T extends
    | StyleSheet.NamedStyles<T>
    | {[P in string | number]: ViewStyle | TextStyle | ImageStyle},
>(factory: (theme: Theme) => T | StyleSheet.NamedStyles<T>) {
  return createStylesHook(factory)();
}
