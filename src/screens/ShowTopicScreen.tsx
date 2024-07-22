import {useMemo} from 'react';
import type {ViewStyle} from 'react-native';
import {Platform, StyleSheet, Text, View} from 'react-native';

import BackgroundView from '../components/BackgroundView';
import ContentScrollView from '../components/ContentScrollView';
import DatePillText from '../components/DatePillText';
import {variance} from '../styling';

export type ShowTopicScreenProps = {
  today: string;
  compensateHeaderHeight?: number;
};

export default function ShowTopicScreen(props: ShowTopicScreenProps) {
  const {today, compensateHeaderHeight} = props;
  const contentContainerStyle: ViewStyle = useMemo(
    () => ({
      overflow: Platform.OS === 'web' ? 'hidden' : 'visible',
      paddingTop: compensateHeaderHeight ?? 0,
    }),
    [compensateHeaderHeight],
  );
  const topIsCompensated = compensateHeaderHeight !== undefined;
  return (
    <ContentScrollView
      contentContainerStyle={contentContainerStyle}
      topIsCompensated={topIsCompensated}>
      <BackgroundView />
      <DatePillText style={layoutStyles.center}>{today}</DatePillText>
      <View style={layoutStyles.delimiter} />
      <QuoteBodyText style={layoutStyles.quoteBody}>
        «Освободившись от погруженности в себя, мы начинаем понимать, что значит
        быть счастливым, радостным и свободным».
      </QuoteBodyText>
      <QuoteSourceText style={layoutStyles.quoteSource}>
        Базовый текст, с. 135
      </QuoteSourceText>
      <View style={layoutStyles.delimiter} />
      <TopicBodyText style={layoutStyles.topicBody}>
        Смех на собраниях часто удивляет новичков. Но в группе ценится
        исцеление, которое несет здоровый смех. Даже если мы сильно встревожены,
        радость, царящая на собраниях, позволяет нам на время повеселиться по
        поводу своего выздоровления. Благодаря юмору мы отвлекаемся от
        погруженности в себя. Жизнь с ее законами часто очень далека от веселья.
        Но если нам удается сохранять чувство юмора по отношению к себе, то мы
        будем легко переносить трудности, которые бы иначе нас сломили. Как
        часто мы доводили себя до того, чтобы расстраиваться по поводу вещей,
        которые, отнесись мы к ним с юмором, совсем не показались бы такими уж
        страшными? Если нас раздражают люди или обстановка, юмор поможет
        взглянуть на вещи не так мрачно. Умение относиться с юмором к трудным
        ситуациям — это дар, который необходимо развивать.
      </TopicBodyText>
      <View style={layoutStyles.delimiter} />
    </ContentScrollView>
  );
}

const MAX_WIDTH = 800;

const layoutStyles = StyleSheet.create({
  center: {
    alignSelf: 'center',
  },
  delimiter: {
    minHeight: 30,
    flexBasis: 0,
    flexShrink: 1,
    flexGrow: 1,
  },
  quoteBody: framedHorizontally(),
  quoteSource: {
    marginTop: 8,
    ...framedHorizontally(),
  },
  topicBody: framedHorizontally(40),
});

function framedHorizontally(padding = 44): ViewStyle {
  return {
    alignSelf: 'stretch',
    paddingHorizontal: padding,
    maxWidth: MAX_WIDTH,
    marginLeft: 'auto',
    marginRight: 'auto',
  };
}

const QuoteBodyText = variance(Text)(theme => ({
  root: {
    textAlign: 'center',
    ...theme.text('quoteBody'),
    color: theme.palette.textPrimary,
    fontSize: 16,
    lineHeight: 20,
  },
}));

const QuoteSourceText = variance(Text)(theme => ({
  root: {
    textAlign: 'center',
    ...theme.text(),
    color: theme.palette.textPrimary,
    fontSize: 11,
    lineHeight: 14,
  },
}));

const TopicBodyText = variance(Text)(theme => ({
  root: {
    textAlign: 'justify',
    ...theme.text(),
    color: theme.palette.textPrimary,
    fontSize: 16,
    lineHeight: 22,
  },
}));
