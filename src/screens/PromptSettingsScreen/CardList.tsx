import {observer} from 'mobx-react-lite';
import {useMemo} from 'react';
import type {TextProps, TextStyle, ViewProps} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';

import BasicButtonText, {
  BORDER_RADIUS,
  BORDER_WIDTH,
} from '../../components/BasicButtonText';
import SkeletonBaseView from '../../components/SkeletonBaseView';
import type {OptionalGetter} from '../../mobx-toolbox';
import {use} from '../../mobx-toolbox';
import type {_Array} from '../../Paramut';
import {fillSpace} from '../../styles';
import {variance} from '../../styling';
import type {MeetingCard} from './MeetingCard';

export type CardListProps = ViewProps & {
  getCards: OptionalGetter<_Array<MeetingCard> | null | undefined>;
  onCardPress?: (id: string) => void;
};

export default observer(function CardList(props: CardListProps) {
  const {getCards, onCardPress, style, ...rest} = props;
  const cards = use(getCards);
  if (cards === null) {
    return null;
  }
  return (
    <View style={[layoutStyles.cardList, style]} {...rest}>
      <CardsHeader>Для проведения собрания</CardsHeader>
      {cards === undefined ? (
        <View style={layoutStyles.cardsContainerRow}>
          <View style={layoutStyles.grow1} />
          <CardsContainer>
            <MeetingCardSkeleton />
            <MeetingCardSkeleton />
            <MeetingCardSkeleton />
            <MeetingCardSkeleton />
            <MeetingCardSkeleton />
            <MeetingCardSkeleton />
            <MeetingCardSkeleton />
          </CardsContainer>
          <View style={layoutStyles.grow1} />
        </View>
      ) : (
        <View style={layoutStyles.cardsContainerRow}>
          <View style={layoutStyles.grow1} />
          <CardsContainer>
            {cards.map((card, index) => (
              <CardListItem
                key={String(index)}
                item={card}
                onCardPress={onCardPress}
              />
            ))}
          </CardsContainer>
          <View style={layoutStyles.grow1} />
        </View>
      )}
    </View>
  );
});

const layoutStyles = StyleSheet.create({
  cardList: {
    gap: 8,
  },
  cardsContainerRow: {
    flexDirection: 'row',
  },
  cardsContainerOuter: {
    flexBasis: 306,
    flexGrow: 0,
    flexShrink: 1,
  },
  cardsContainerInner: {
    gap: 16,
    paddingVertical: 21,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  grow1: fillSpace(1),
});

const CardsHeader = variance(Text)(
  theme => ({
    root: {
      textAlign: 'center',
      color: theme.palette.textPrimary,
      ...theme.fontByWeight('400'),
      fontSize: 17,
      lineHeight: 21,
    },
  }),
  (): TextProps => ({
    role: 'heading',
  }),
);

const CardsContainer = variance(View)(
  theme => ({
    root: {
      backgroundColor: theme.palette.backgroundAverage,
    },
  }),
  (): ViewProps => ({
    style: [layoutStyles.cardsContainerOuter, layoutStyles.cardsContainerInner],
  }),
);

type CardListItemProps = ViewProps & {
  item: MeetingCard;
  onCardPress?: (id: string) => void;
};

const CardListItem = observer(function CardListItem(props: CardListItemProps) {
  const {item, onCardPress} = props;
  const {id, textColor, backgroundColor, borderColor, title} = item;
  const onPress = useMemo(
    () =>
      onCardPress &&
      (() => {
        onCardPress(id);
      }),
    [id, onCardPress],
  );
  const style = useMemo<TextStyle>(
    () => ({
      color: textColor,
      backgroundColor,
      borderColor: borderColor ?? backgroundColor,
    }),
    [backgroundColor, borderColor, textColor],
  );
  return (
    <MeetingCardText onPress={onPress} style={style}>
      {title}
    </MeetingCardText>
  );
});

const PADDING_VERTICAL = 8;
const LINE_HEIGHT = 18;
const HEIGHT = LINE_HEIGHT + PADDING_VERTICAL * 2 + BORDER_WIDTH * 2;

const MeetingCardText = variance(BasicButtonText)(theme => ({
  root: {
    alignSelf: 'stretch',
    paddingVertical: PADDING_VERTICAL,
    paddingHorizontal: 8,
    backgroundColor: theme.palette.background,
    fontSize: 15,
    lineHeight: LINE_HEIGHT,
  },
}));

const MeetingCardSkeleton = variance(SkeletonBaseView)(() => ({
  root: {
    alignSelf: 'stretch',
    borderRadius: BORDER_RADIUS,
    height: HEIGHT,
  },
}));
