import {useMemo} from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';

import ContentScrollView from '../components/ContentScrollView';
import {fillSpace} from '../styles';
import {variance} from '../styling';

export type ShowMeetingCardScreenProps = {
  title: string;
  body: string;
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
  compensateHeaderHeight?: number;
};

export default function ShowMeetingCardScreen(
  props: ShowMeetingCardScreenProps,
) {
  const {
    title,
    body,
    backgroundColor,
    textColor,
    borderColor = textColor,
    compensateHeaderHeight,
  } = props;
  const cardStyle: ViewStyle = useMemo(() => ({borderColor}), [borderColor]);
  const textStyle: TextStyle = useMemo(() => ({color: textColor}), [textColor]);
  const scrollViewStyle: ViewStyle = useMemo(
    () => ({backgroundColor}),
    [backgroundColor],
  );
  const contentContainerStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor,
      paddingTop: compensateHeaderHeight ?? 0,
    }),
    [backgroundColor, compensateHeaderHeight],
  );
  const topIsCompensated = compensateHeaderHeight !== undefined;
  return (
    <ContentScrollView
      style={scrollViewStyle}
      contentContainerStyle={contentContainerStyle}
      topIsCompensated={topIsCompensated}>
      <View style={layoutStyles.cardContainer}>
        <View style={layoutStyles.grow1} />
        <View style={[layoutStyles.card, cardStyle]}>
          <View style={layoutStyles.grow1} />
          <TitleText style={textStyle}>{title}</TitleText>
          <View style={layoutStyles.grow1} />
          <BodyText style={textStyle}>{body}</BodyText>
          <View style={layoutStyles.grow1} />
        </View>
        <View style={layoutStyles.grow1} />
      </View>
    </ContentScrollView>
  );
}

const MAX_WIDTH = 800;

const layoutStyles = StyleSheet.create({
  cardContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  grow1: fillSpace(1),
  card: {
    alignSelf: 'stretch',
    flexBasis: MAX_WIDTH,
    flexGrow: 0,
    flexShrink: 1,
    padding: 16,
    margin: 16,
    borderWidth: 4,
    borderStyle: 'dotted',
  },
});

const TitleText = variance(Text)(theme => ({
  root: {
    textAlign: 'center',
    ...theme.text(),
    fontSize: 23,
    lineHeight: 27,
  },
}));

const BodyText = variance(Text)(theme => ({
  root: {
    textAlign: 'justify',
    ...theme.text(),
    fontSize: 16,
    lineHeight: 22,
  },
}));
