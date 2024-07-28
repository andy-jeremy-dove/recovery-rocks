import {useHeaderHeight} from '@react-navigation/elements';
import type {StackScreenProps} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';
import {useCallback} from 'react';

import {expr} from '../mobx-toolbox';
import {useRoot} from '../Root';
import type {RootStackParamList} from '../RootStack/RootStackParamList';
import PromptSetupScreen, {
  type ProfileFormState,
} from '../screens/PromptSetupScreen';

export type PromptSetupBindingProps = StackScreenProps<
  RootStackParamList,
  'PromptSetup'
>;

export default observer(function PromptSetupBinding(
  props: PromptSetupBindingProps,
) {
  const {navigation} = props;
  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.reset({index: 0, routes: [{name: 'ShowProgress'}]});
  }, [navigation]);
  const headerHeight = useHeaderHeight();
  const root = useRoot();
  const formState = expr(() => {
    const profile = root.profileStorage.current;
    if (profile === undefined) {
      return undefined;
    }
    return profile satisfies ProfileFormState<true>;
  });
  const saveProfile = useCallback(
    (_: ProfileFormState) => {
      root.profileStorage.set(_);
      goBack();
    },
    [goBack, root],
  );

  return (
    <PromptSetupScreen
      cancellation
      onCancel={goBack}
      compensateHeaderHeight={headerHeight}
      formState={formState}
      onSubmit={saveProfile}
    />
  );
});
