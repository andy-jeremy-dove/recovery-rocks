import type {TextStyle} from 'react-native';
import {Text} from 'react-native';

import {variance} from '../styling';

export default variance(Text)(theme => ({
  root: {
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: theme.palette.backgroundAccent,
    ...theme.fontByWeight('400'),
    color: theme.palette.textAccent,
    fontSize: 17,
    ...horizontalPillText(21, 4),
  },
}));

function horizontalPillText(
  lineHeight: number,
  paddingVertical: number,
): TextStyle {
  const borderRadius = (lineHeight + paddingVertical * 2) / 2;
  return {
    paddingVertical,
    paddingHorizontal: borderRadius,
    borderRadius,
    lineHeight,
  };
}
