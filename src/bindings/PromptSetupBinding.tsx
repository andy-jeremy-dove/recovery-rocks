import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../RootStack/RootStack";
import {PromptSetupScreen} from "../screens/PromptSetupScreen";
import {useCallback} from "react";
import {useHeaderHeight} from '@react-navigation/elements';

export type PromptSetupBindingProps = StackScreenProps<RootStackParamList, 'PromptSetup'>;

export function PromptSetupBinding(props: PromptSetupBindingProps) {
  const {navigation} = props;
  const onCancel = useCallback(() => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
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
