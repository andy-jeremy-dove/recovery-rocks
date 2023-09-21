import {useHeaderHeight} from '@react-navigation/elements';
import {StackScreenProps} from '@react-navigation/stack';
import {memo} from 'react';

import {RootStackParamList} from '../RootStack/RootStackParamList';
import ShowMeetingCardScreen from '../screens/ShowMeetingCardScreen';

export type ShowMeetingCardBindingProps = StackScreenProps<
  RootStackParamList,
  'ShowMeetingCard'
>;

export default function ShowMeetingCardBinding(
  props: ShowMeetingCardBindingProps,
) {
  const {navigation, route} = props;
  return (
    <ShowMeetingCardStableBinding
      navigation={navigation}
      routeKey={route.key}
    />
  );
}

const ShowMeetingCardStableBinding = memo(_ShowMeetingCardStableBinding);

type ShowMeetingCardStableBindingProps = Pick<
  ShowMeetingCardBindingProps,
  'navigation'
> & {
  routeKey: string;
};

function _ShowMeetingCardStableBinding(
  props: ShowMeetingCardStableBindingProps,
) {
  const headerHeight = useHeaderHeight();
  return (
    <ShowMeetingCardScreen
      title={TITLE}
      body={BODY}
      backgroundColor="#ff0"
      textColor="#000"
      borderColor={undefined}
      compensateHeaderHeight={headerHeight}
    />
  );
}

const TITLE = 'Lorem ipsum';

const BODY = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nunc est, eleifend id ullamcorper nec, maximus et erat. Suspendisse orci massa, faucibus vitae scelerisque id, hendrerit sit amet nisi. Vestibulum vestibulum condimentum diam vel scelerisque. Etiam nunc neque, ultrices ut ex ut, condimentum suscipit ex. Sed viverra ante nulla, gravida mollis odio sagittis sit amet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent in sem velit. Nunc blandit, mauris non tristique volutpat, elit risus fermentum diam, sit amet pellentesque risus ante rhoncus purus. Sed dignissim elit quis dolor bibendum, id varius eros vehicula. Sed ut pellentesque enim. Donec eu fringilla enim. Nam sed fringilla enim, quis feugiat sem. Integer vel tellus imperdiet, venenatis tellus nec, pharetra ante. Nam a ligula tortor. Aenean scelerisque erat ac malesuada porta. Ut posuere urna purus. Phasellus tempor arcu rutrum magna vulputate sollicitudin quis a purus. Vestibulum aliquet justo vel velit venenatis posuere. Proin elementum fringilla orci in hendrerit. Morbi placerat est et enim tristique efficitur. Sed maximus sem sit amet facilisis vehicula. Nulla eleifend felis viverra erat tincidunt pretium. Sed congue augue quis mi ornare condimentum. Vestibulum ullamcorper mauris eget tristique fermentum. Vivamus non ornare purus. Donec at faucibus lorem. Duis pretium orci vel porttitor accumsan. Nulla malesuada sit amet massa vitae dictum. Aenean tincidunt mollis quam, sed dictum eros porta quis. Duis mollis, metus ut convallis tincidunt, libero mauris tincidunt lacus, non rutrum purus urna sed nisi. Duis ac justo felis. Phasellus lobortis vel purus nec venenatis. Morbi lobortis vulputate tellus at tincidunt. Sed at justo et risus iaculis placerat. Quisque ullamcorper leo vitae ligula placerat vestibulum. Vestibulum tristique mollis viverra.`;
