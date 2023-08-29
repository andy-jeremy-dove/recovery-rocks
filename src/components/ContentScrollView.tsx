import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
} from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";

import { variance } from "../styling";

export type ContentScrollViewProps = ScrollViewProps & {
  topIsCompensated?: boolean;
};

export function ContentScrollView(props: ContentScrollViewProps) {
  const { topIsCompensated, children, ...rest } = props;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={layoutStyles.root}
    >
      <Content {...rest}>
        <SafeAreaView
          mode="padding"
          style={layoutStyles.root}
          edges={topIsCompensated ? excludeTop : undefined}
        >
          {children}
        </SafeAreaView>
      </Content>
    </KeyboardAvoidingView>
  );
}

const excludeTop: Edges = ["left", "right", "bottom"];

const layoutStyles = StyleSheet.create({
  root: {
    flex: 0,
    flexGrow: 1,
    flexShrink: 0,
  },
});

const Content = variance(ScrollView)(
  (theme) => ({
    root: {
      flex: 1,
      flexWrap: "nowrap",
      backgroundColor: theme.palette.background,
    },
    contentContainer: {
      flexGrow: 1,
      flexShrink: 0,
      alignItems: "stretch",
      backgroundColor: theme.palette.background,
    },
  }),
  (_theme, styles): ScrollViewProps => ({
    contentContainerStyle: styles.contentContainer,
    keyboardShouldPersistTaps: "handled",
  }),
);
