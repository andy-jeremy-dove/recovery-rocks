import {TextStyle} from 'react-native';

export default function textSkeleton(
  fontSize: number,
  lineHeight: number,
): TextStyle {
  const height = (fontSize / 20) * 16;
  const margin = ((lineHeight - fontSize) / 6) * 5;
  const borderRadius = (lineHeight / 26) * 4;
  return {height, margin, borderRadius};
}
