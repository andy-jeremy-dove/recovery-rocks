import { useHeaderHeight } from "@react-navigation/elements";
import { StackScreenProps } from "@react-navigation/stack";
import { useCallback } from "react";

import { RootStackParamList } from "../RootStack/RootStack";
import { PromptSetupScreen } from "../screens/PromptSetupScreen";

export type PromptSetupBindingProps = StackScreenProps<
  RootStackParamList,
  "PromptSetup"
>;

export function PromptSetupBinding(props: PromptSetupBindingProps) {
  const { navigation } = props;
  const onCancel = useCallback(() => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
    navigation.reset({ index: 0, routes: [{ name: "ShowProgress" }] });
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
