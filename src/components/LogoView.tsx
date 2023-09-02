import { useMemo } from "react";
import { StyleSheet, View, Animated, ViewProps } from "react-native";

import { variance } from "../styling";

export type LogoViewProps = ViewProps & {
  size: number;
};

export default function LogoView(props: LogoViewProps) {
  const { size, style, ...rest } = props;
  const rootStyle = useMemo(
    () => [{ width: size, height: size }, style],
    [size, style],
  );
  const circleStyle = useMemo(() => ({ borderRadius: size / 2 }), [size]);
  return (
    <View style={rootStyle} {...rest}>
      <Circle style={circleStyle} />
      <Square />
    </View>
  );
}

const BORDER_WIDTH = 3;

const Square = variance(View)((theme) => ({
  root: {
    position: "absolute",
    left: "19%",
    right: "19%",
    top: "19%",
    bottom: "19%",
    borderWidth: BORDER_WIDTH,
    borderColor: theme.palette.textPrimary,
    transform: [{ rotate: "45deg" }],
  },
}));

const Circle = variance(Animated.View)((theme) => ({
  root: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: BORDER_WIDTH,
    borderColor: theme.palette.textPrimary,
  },
}));
