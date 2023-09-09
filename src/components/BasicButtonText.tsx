import {Text, TextProps} from 'react-native';

import {variance} from '../styling';

export default variance(Text)(
  theme => ({
    root: {
      borderWidth: BORDER_WIDTH,
      borderRadius: BORDER_RADIUS,
      borderColor: theme.palette.borderPrimary,
      overflow: 'hidden',
      paddingVertical: 8,
      paddingHorizontal: 32,
      textAlign: 'center',
      ...theme.fontByWeight('400'),
      color: theme.palette.textPrimary,
      fontSize: 20,
      lineHeight: 24,
    },
  }),
  (): TextProps => ({
    role: 'button',
    suppressHighlighting: true,
  }),
);

export const BORDER_WIDTH = 1;
export const BORDER_RADIUS = 12;
