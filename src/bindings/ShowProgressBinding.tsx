import { useHeaderHeight } from "@react-navigation/elements";
import { StackScreenProps } from "@react-navigation/stack";
import dayjs from "dayjs";
import { useCallback } from "react";

import { RootStackParamList } from "../RootStack/RootStack";
import { ShowProgressScreen } from "../screens/ShowProgressScreen";

export type ShowProgressBindingProps = StackScreenProps<
  RootStackParamList,
  "ShowProgress"
>;

export function ShowProgressBinding(props: ShowProgressBindingProps) {
  const { navigation } = props;
  const promptSetup = useCallback(() => {
    navigation.navigate("PromptSetup");
  }, [navigation]);
  const headerHeight = useHeaderHeight();
  const today = dayjs().format("D MMMM YYYY").toLowerCase();
  return (
    <ShowProgressScreen
      today={today}
      ProgressFallback={ProgressFallback}
      progressInfo={null}
      quote={undefined}
      onQuotePress={promptSetup}
      compensateHeaderHeight={headerHeight}
    />
  );
}

function ProgressFallback() {
  return null;
}
