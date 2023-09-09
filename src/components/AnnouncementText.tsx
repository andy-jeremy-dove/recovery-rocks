import {Text} from 'react-native';

import {variance} from '../styling';

export default variance(Text)(theme => ({
  root: {
    textAlign: 'center',
    ...theme.fontByWeight('400'),
    color: theme.palette.textPrimary,
    fontSize: 20,
    lineHeight: 26,
  },
}));
