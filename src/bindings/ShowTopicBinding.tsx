import {useHeaderHeight} from '@react-navigation/elements';
import {StackScreenProps} from '@react-navigation/stack';
import dayjs from 'dayjs';
import {memo, useState} from 'react';

import {RootStackParamList} from '../RootStack/RootStackParamList';
import ShowTopicScreen from '../screens/ShowTopicScreen';

export type ShowTopicBindingProps = StackScreenProps<
  RootStackParamList,
  'ShowTopic'
>;

export default function ShowTopicBinding(props: ShowTopicBindingProps) {
  const {navigation, route} = props;
  return (
    <ShowTopicStableBinding navigation={navigation} routeKey={route.key} />
  );
}

const ShowTopicStableBinding = memo(_ShowTopicStableBinding);

type ShowTopicStableBindingProps = Pick<ShowTopicBindingProps, 'navigation'> & {
  routeKey: string;
};

function _ShowTopicStableBinding(props: ShowTopicStableBindingProps) {
  const headerHeight = useHeaderHeight();
  const [$now] = useState(() => dayjs());
  const today = $now.format('D MMMM YYYY').toLowerCase();
  return (
    <ShowTopicScreen today={today} compensateHeaderHeight={headerHeight} />
  );
}
