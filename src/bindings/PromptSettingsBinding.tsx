import {useHeaderHeight} from '@react-navigation/elements';
import type {StackScreenProps} from '@react-navigation/stack';
import {runInAction} from 'mobx';
import {observer} from 'mobx-react-lite';
import {useCallback, useState} from 'react';

import {expr} from '../mobx-toolbox';
import type {MeetingCardId} from '../RecoveryRocks/TheWholeDump';
import {useRoot} from '../Root';
import type {RootStackParamList} from '../RootStack/RootStackParamList';
import type {
  MeetingCard,
  ThemeId,
  ThemeItems,
} from '../screens/PromptSettingsScreen';
import {PromptSettingsScreen} from '../screens/PromptSettingsScreen';
import classicTheme from '../styling/Theme/classicTheme';
import darkTheme from '../styling/Theme/darkTheme';
import lightTheme from '../styling/Theme/lightTheme';
import {defaultThemeRecord, isLightThemeKind, ThemeKind} from '../ThemeRecord';
import type {Millisecond} from '../Time';
import interval from '../Time/interval';

export type PromptSettingsBindingProps = StackScreenProps<
  RootStackParamList,
  'PromptSettings'
>;

export default observer(function PromptSettingsBinding(
  props: PromptSettingsBindingProps,
) {
  const {navigation} = props;
  const onSetupPress = useCallback(() => {
    navigation.navigate('PromptSetup');
  }, [navigation]);
  const getCards = useCards();
  const onCardPress = useCallback(
    (id: string) => {
      navigation.navigate('ShowMeetingCard', {id: id as MeetingCardId});
    },
    [navigation],
  );
  const headerHeight = useHeaderHeight();
  const root = useRoot();
  const getToday = useCallback(
    () => root.currentTime.wrapped.format('D MMMM YYYY').toLowerCase(),
    [root],
  );
  const getDoesObeySystem = useCallback(
    () => root.themeStorage.current?.mustObeySystem,
    [root],
  );
  const toggleSystemObedience = useCallback(() => {
    root.themeStorage.set((_ = defaultThemeRecord) => ({
      ..._,
      mustObeySystem: !_.mustObeySystem,
    }));
  }, [root]);
  const $themeItems = useCallback(
    () =>
      expr(() => {
        const {mustObeySystem, fixed, light, dark} =
          root.themeStorage.current ?? defaultThemeRecord;
        const currentLightTheme = mustObeySystem ? light : fixed;
        const currentDarkTheme = mustObeySystem ? dark : fixed;
        const classicSelected = currentDarkTheme === ThemeKind.Classic;
        const darkSelected = currentDarkTheme === ThemeKind.Dark;
        const lightSelected = currentLightTheme === ThemeKind.Light;
        return [
          {
            id: ThemeKind.Classic as ThemeId,
            theme: classicTheme,
            title: 'Классическая',
            selected: classicSelected,
          },
          {
            id: ThemeKind.Dark as ThemeId,
            theme: darkTheme,
            title: 'Тёмная',
            selected: darkSelected,
          },
          {
            id: ThemeKind.Light as ThemeId,
            theme: lightTheme,
            title: 'Светлая',
            selected: lightSelected,
          },
        ] satisfies ThemeItems;
      }),
    [root],
  );
  const onThemeItemPress = useCallback(
    (id: ThemeId) => {
      const kind = id as ThemeKind;
      root.themeStorage.set((_ = defaultThemeRecord) => {
        if (_.mustObeySystem) {
          if (isLightThemeKind(kind)) {
            return {..._, light: kind};
          }
          return {..._, dark: kind};
        }
        return {..._, fixed: kind};
      });
    },
    [root],
  );
  return (
    <PromptSettingsScreen
      getToday={getToday}
      getDoesObeySystem={getDoesObeySystem}
      toggleSystemObedience={toggleSystemObedience}
      $themeItems={$themeItems}
      onThemeItemPress={onThemeItemPress}
      onSetupPress={onSetupPress}
      getCards={getCards}
      onCardPress={onCardPress}
      compensateHeaderHeight={headerHeight}
    />
  );
});

function useCards(
  delay = 3000 as Millisecond,
): () => MeetingCard[] | null | undefined {
  const [getCurrent] = useState(() => interval(delay));
  const [_start] = useState(() => getCurrent());
  return useCallback(
    () =>
      expr(() => {
        const current = runInAction(getCurrent);
        if (current - _start >= delay) {
          return cards;
        }
        getCurrent();
      }),
    [_start, delay, getCurrent],
  );
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
    title: 'Двенадцать традиций АН',
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
