import type {_Array, _Map} from '../Paramut';
import type {MeetingCard, MeetingCardId} from '../RecoveryRocks/TheWholeDump';

const BODY = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nunc est, eleifend id ullamcorper nec, maximus et erat. Suspendisse orci massa, faucibus vitae scelerisque id, hendrerit sit amet nisi. Vestibulum vestibulum condimentum diam vel scelerisque. Etiam nunc neque, ultrices ut ex ut, condimentum suscipit ex. Sed viverra ante nulla, gravida mollis odio sagittis sit amet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent in sem velit. Nunc blandit, mauris non tristique volutpat, elit risus fermentum diam, sit amet pellentesque risus ante rhoncus purus. Sed dignissim elit quis dolor bibendum, id varius eros vehicula. Sed ut pellentesque enim. Donec eu fringilla enim. Nam sed fringilla enim, quis feugiat sem. Integer vel tellus imperdiet, venenatis tellus nec, pharetra ante. Nam a ligula tortor. Aenean scelerisque erat ac malesuada porta. Ut posuere urna purus. Phasellus tempor arcu rutrum magna vulputate sollicitudin quis a purus. Vestibulum aliquet justo vel velit venenatis posuere. Proin elementum fringilla orci in hendrerit. Morbi placerat est et enim tristique efficitur. Sed maximus sem sit amet facilisis vehicula. Nulla eleifend felis viverra erat tincidunt pretium. Sed congue augue quis mi ornare condimentum. Vestibulum ullamcorper mauris eget tristique fermentum. Vivamus non ornare purus. Donec at faucibus lorem. Duis pretium orci vel porttitor accumsan. Nulla malesuada sit amet massa vitae dictum. Aenean tincidunt mollis quam, sed dictum eros porta quis. Duis mollis, metus ut convallis tincidunt, libero mauris tincidunt lacus, non rutrum purus urna sed nisi. Duis ac justo felis. Phasellus lobortis vel purus nec venenatis. Morbi lobortis vulputate tellus at tincidunt. Sed at justo et risus iaculis placerat. Quisque ullamcorper leo vitae ligula placerat vestibulum. Vestibulum tristique mollis viverra.`;

export const cards = Object.freeze([
  Object.freeze({
    id: '1' as MeetingCardId,
    title: 'Кто такой зависимый?',
    body: `1 ${BODY}`,
    backgroundColor: '#96CEDD',
    textColor: '#000',
    borderColor: '#96CEDD',
  }),
  Object.freeze({
    id: '2' as MeetingCardId,
    title: 'Что такое программа АН?',
    body: `2 ${BODY}`,
    backgroundColor: '#EDDD34',
    textColor: '#000',
    borderColor: '#EDDD34',
  }),
  Object.freeze({
    id: '3' as MeetingCardId,
    title: 'Почему мы здесь?',
    body: `3 ${BODY}`,
    backgroundColor: '#E4D8A9',
    textColor: '#000',
    borderColor: '#E4D8A9',
  }),
  Object.freeze({
    id: '4' as MeetingCardId,
    title: 'Как это работает?',
    body: `4 ${BODY}`,
    backgroundColor: '#fff',
    textColor: '#000',
    borderColor: '#000',
  }),
  Object.freeze({
    id: '5' as MeetingCardId,
    title: 'Двенадцать традиций АН',
    body: `5 ${BODY}`,
    backgroundColor: '#E7E7E7',
    textColor: '#000',
    borderColor: '#000',
  }),
  Object.freeze({
    id: '6' as MeetingCardId,
    title: 'Только сегодня',
    body: `6 ${BODY}`,
    backgroundColor: '#CEAECD',
    textColor: '#000',
    borderColor: '#CEAECD',
  }),
  Object.freeze({
    id: '7' as MeetingCardId,
    title: 'Мы действительно выздоравливаем',
    body: `7 ${BODY}`,
    backgroundColor: '#4BB28D',
    textColor: '#000',
    borderColor: '#4BB28D',
  }),
] as const) satisfies _Array<MeetingCard>;

export const cardsById = new Map(cards.map(_ => [_.id, _])) satisfies _Map<
  MeetingCardId,
  MeetingCard
>;
