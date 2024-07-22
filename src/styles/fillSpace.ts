import type {ViewStyle} from 'react-native';

export default function fillSpace(_: number): ViewStyle {
  return {
    flexBasis: 0,
    flexGrow: _,
    flexShrink: _,
  };
}
