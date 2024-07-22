import {useHeaderHeight} from '@react-navigation/elements';
import type {StackScreenProps} from '@react-navigation/stack';
import {useCallback} from 'react';

import type {RootStackParamList} from '../RootStack/RootStackParamList';
import PromptSetupScreen from '../screens/PromptSetupScreen';

export type PromptSetupBindingProps = StackScreenProps<
  RootStackParamList,
  'PromptSetup'
>;

export default function PromptSetupBinding(props: PromptSetupBindingProps) {
  const {navigation} = props;
  const onCancel = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.reset({index: 0, routes: [{name: 'ShowProgress'}]});
  }, [navigation]);
  const headerHeight = useHeaderHeight();
  return (
    <PromptSetupScreen
      cancellation
      onCancel={onCancel}
      compensateHeaderHeight={headerHeight}
    />
  );
}
