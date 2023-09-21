import {useHeaderHeight} from '@react-navigation/elements';
import {StackScreenProps} from '@react-navigation/stack';
import dayjs from 'dayjs';
import {useCallback, useState} from 'react';

import {MeetingCardId} from '../RecoveryRocks/TheWholeDump';
import {RootStackParamList} from '../RootStack/RootStackParamList';
import {Millisecond} from '../Time';
import interval from '../Time/interval';
import {
  PromptSettingsScreen,
  MeetingCard,
} from '../screens/PromptSettingsScreen';
import {computed, Observable} from '../structure';

export type PromptSettingsBindingProps = StackScreenProps<
  RootStackParamList,
  'PromptSettings'
>;

export default function PromptSettingsBinding(
  props: PromptSettingsBindingProps,
) {
  const {navigation} = props;
  const [$now] = useState(() => dayjs());
  const today = $now.format('D MMMM YYYY').toLowerCase();
  const [doesObeySystem, setSystemObedience] = useState(false);
  const toggleSystemObedience = useCallback(
    () => setSystemObedience(_ => !_),
    [],
  );
  const onSetupPress = useCallback(
    () => navigation.navigate('PromptSetup'),
    [navigation],
  );
  const $cards = useCards();
  const onCardPress = useCallback(
    (id: string) => {
      navigation.navigate('ShowMeetingCard', {id: id as MeetingCardId});
    },
    [navigation],
  );
  const headerHeight = useHeaderHeight();
  return (
    <PromptSettingsScreen
      $today={today}
      $doesObeySystem={doesObeySystem}
      toggleSystemObedience={toggleSystemObedience}
      onSetupPress={onSetupPress}
      $cards={$cards}
      onCardPress={onCardPress}
      compensateHeaderHeight={headerHeight}
    />
  );
}

function useCards(
  delay = 3000 as Millisecond,
): Observable<MeetingCard[] | null | undefined> {
  const [$interval] = useState(() => interval(delay));
  const [_start] = useState(() => $interval.peek());
  const [$cards] = useState(() =>
    computed((use, drop) => {
      if (use($interval) - _start >= delay) {
        drop($interval);
        return cards;
      }
    }),
  );
  return $cards;
}

const cards: MeetingCard[] = [
  {
    id: '1',
    title: 'Кто такой зависимый?',
    backgroundColor: '#96CEDD',
    textColor: '#000',
  },
  {
    id: '2',
    title: 'Что такое программа АН?',
    backgroundColor: '#EDDD34',
    textColor: '#000',
  },
  {
    id: '3',
    title: 'Почему мы здесь?',
    backgroundColor: '#E4D8A9',
    textColor: '#000',
  },
  {
    id: '4',
    title: 'Как это работает?',
    backgroundColor: '#fff',
    textColor: '#000',
    borderColor: '#000',
  },
  {
    id: '5',
    title: 'Двенадцать традиций АН?',
    backgroundColor: '#E7E7E7',
    textColor: '#000',
    borderColor: '#000',
  },
  {
    id: '6',
    title: 'Только сегодня',
    backgroundColor: '#CEAECD',
    textColor: '#000',
  },
  {
    id: '7',
    title: 'Мы действительно выздоравливаем',
    backgroundColor: '#4BB28D',
    textColor: '#000',
  },
];
