import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export type HorizontalFrameProps = {
  children?: ReactNode;
};

export function HorizontalFrame(props: HorizontalFrameProps) {
  return (
    <View style={styles.row}>
      <View style={styles.target}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  target: {
    marginHorizontal: 8,
    flexBasis: 300,
    flexShrink: 1,
    alignItems: "stretch",
  },
});
