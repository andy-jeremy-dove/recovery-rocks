import {Text} from 'react-native';

import {variance} from '../styling';

export default variance(Text)(theme => ({
  root: {
    color: theme.palette.link,
  },
  hover: {
    textDecorationColor: theme.palette.link,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  active: {
    backgroundColor: theme.palette.backgroundAccent,
  },
}));
