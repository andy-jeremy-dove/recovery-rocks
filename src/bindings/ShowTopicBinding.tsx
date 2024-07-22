import {useHeaderHeight} from '@react-navigation/elements';
import dayjs from 'dayjs';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';

import ShowTopicScreen from '../screens/ShowTopicScreen';

export default observer(function ShowTopicBinding() {
  const headerHeight = useHeaderHeight();
  const [$now] = useState(() => dayjs());
  const today = $now.format('D MMMM YYYY').toLowerCase();
  return (
    <ShowTopicScreen today={today} compensateHeaderHeight={headerHeight} />
  );
});
