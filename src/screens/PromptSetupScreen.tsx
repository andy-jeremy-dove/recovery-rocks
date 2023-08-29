import { useCallback, useMemo, useState } from "react";
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewStyle,
} from "react-native";

import { ContentScrollView } from "../components/ContentScrollView";
import { DatePicker } from "../components/DatePicker";
import { Gender, GenderPicker } from "../components/GenderPicker";
import { HorizontalFrame } from "../components/HorizontalFrame";
import { variance } from "../styling";

export type SetupScreenProps = {
  cancellation?: boolean;
  onCancel?: () => void;
  compensateHeaderHeight?: number;
};

export function PromptSetupScreen(props: SetupScreenProps) {
  const { compensateHeaderHeight, cancellation, onCancel } = props;
  const [gender, setGender] = useState(Gender.Male);
  const onPress = useCallback(() => {
    Keyboard.dismiss();
  }, []);
  const topStyle: StyleProp<ViewStyle> = useMemo(
    () => [layoutStyles.grow5, { flexBasis: compensateHeaderHeight ?? 0 }],
    [compensateHeaderHeight],
  );
  const topIsCompensated = compensateHeaderHeight !== undefined;
  return (
    <ContentScrollView topIsCompensated={topIsCompensated}>
      <View style={topStyle} />
      <View>
        <FieldTitle secondary>Ваше имя</FieldTitle>
        <HorizontalFrame>
          <NameInput tabIndex={0} />
        </HorizontalFrame>
        <HorizontalFrame>
          <GenderPicker value={gender} onChange={setGender} />
        </HorizontalFrame>
      </View>
      <View style={layoutStyles.grow1} />
      <View>
        <FieldTitle>Первый день чистоты</FieldTitle>
        <HorizontalFrame>
          <DatePicker day={12} month={12} year={2012} />
        </HorizontalFrame>
      </View>
      <View style={layoutStyles.grow3} />
      <View>
        <SubmitButton tabIndex={0} onPress={onPress}>
          Готово
        </SubmitButton>
        {cancellation && (
          <SubmitButton tabIndex={0} onPress={onCancel}>
            Отмена
          </SubmitButton>
        )}
      </View>
      <View style={layoutStyles.grow7} />
    </ContentScrollView>
  );
}

const layoutStyles = StyleSheet.create({
  grow1: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
  },
  grow3: {
    flexBasis: 0,
    flexGrow: 3,
    flexShrink: 3,
  },
  grow5: {
    flexBasis: 0,
    flexGrow: 5,
    flexShrink: 5,
  },
  grow7: {
    flexBasis: 0,
    flexGrow: 7,
    flexShrink: 7,
  },
});

const FieldTitle = variance(Text)(
  (theme) => ({
    root: {
      marginVertical: 8,
      textAlign: "center",
      ...theme.fontByWeight("400"),
      color: theme.palette.textPrimary,
      fontSize: 20,
      lineHeight: 26,
    },
    secondary: {
      color: theme.palette.textSecondary,
    },
  }),
  (): TextProps => ({
    selectable: false,
  }),
);

const NameInput = variance(TextInput)(
  (theme) => ({
    root: {
      marginVertical: 8,
      borderWidth: 1,
      borderColor: theme.palette.borderSecondary,
      borderRadius: 12,
      paddingVertical: 8,
      paddingHorizontal: 16,
      ...theme.fontByWeight("400"),
      color: theme.palette.textPrimary,
      fontSize: 20,
      lineHeight: 26,
    },
  }),
  (theme): TextInputProps => ({
    inputMode: "text",
    autoComplete: "name",
    autoCorrect: true,
    hitSlop,
    keyboardAppearance: theme.isDark ? "dark" : "light",
  }),
);

const hitSlop = { left: 16, top: 8, right: 16, bottom: 8 } as const;

const SubmitButton = variance(Text)(
  (theme) => ({
    root: {
      alignSelf: "center",
      marginVertical: 8,
      minWidth: 160,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: theme.palette.borderPrimary,
      paddingVertical: 8,
      paddingHorizontal: 32,
      textAlign: "center",
      ...theme.fontByWeight("400"),
      color: theme.palette.textPrimary,
      fontSize: 20,
      lineHeight: 24,
    },
  }),
  (): TextProps => ({
    role: "button",
    suppressHighlighting: true,
  }),
);
