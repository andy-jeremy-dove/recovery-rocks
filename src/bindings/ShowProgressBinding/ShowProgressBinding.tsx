import {useHeaderHeight} from '@react-navigation/elements';
import type {StackScreenProps} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';
import {useCallback, useMemo} from 'react';

import {
  useNavigationGetIsFocused,
  useStackNavigationState,
} from '../../Navigation';
import {useRoot} from '../../Root';
import type {RootStackParamList} from '../../RootStack/RootStackParamList';
import ShowProgressScreen from '../../screens/ShowProgressScreen';
import Announcement from './Announcement';
import ShowProgressBindingStateImpl from './ShowProgressBindingStateImpl';
import useTabKey from './useTabKey';

export type ShowProgressBindingProps = StackScreenProps<
  RootStackParamList,
  'ShowProgress'
>;

export default function ShowProgressBinding(props: ShowProgressBindingProps) {
  const {navigation, route} = props;
  return (
    <ShowProgressStableBinding navigation={navigation} routeKey={route.key} />
  );
}

const ShowProgressStableBinding = observer(_ShowProgressStableBinding);

type ShowProgressStableBindingProps = Pick<
  ShowProgressBindingProps,
  'navigation'
> & {
  routeKey: string;
};

function _ShowProgressStableBinding(props: ShowProgressStableBindingProps) {
  const {navigation, routeKey} = props;
  const provider = useStackNavigationState(navigation);
  const getIsFocused = useNavigationGetIsFocused(routeKey, provider);

  const [getTabKey, setTabKey] = useTabKey(navigation, routeKey, provider);

  const showTopic = useCallback(() => {
    navigation.navigate('ShowTopic');
  }, [navigation]);

  const promptSetup = useCallback(() => {
    navigation.navigate('PromptSetup');
  }, [navigation]);

  const headerHeight = useHeaderHeight();

  const root = useRoot();
  const state = useMemo(() => new ShowProgressBindingStateImpl(root), [root]);

  const announcement = useMemo(
    () => <Announcement promptSetup={promptSetup} />,
    [promptSetup],
  );

  return (
    <ShowProgressScreen
      today={state.today}
      onTodayPress={showTopic}
      announcement={announcement}
      getTabKey={getTabKey}
      setTabKey={setTabKey}
      getIsFocused={getIsFocused}
      dailyAchievement={state.dailyAchievement}
      anniversaryAchievement={state.anniversaryAchievement}
      congratulation="Сегодня юбилей!"
      quote="Освободившись от погруженности в себя, мы начинаем понимать, что значит быть счастливым, радостным и свободным."
      onQuotePress={showTopic}
      compensateHeaderHeight={headerHeight}
    />
  );
}
