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
        <View style={layoutStyles.row}>
          <NameInput style={fixedWide} tabIndex={0} />
        </View>
        <View style={layoutStyles.row}>
          <GenderPicker style={fixedWide} value={gender} onChange={setGender} />
        </View>
      </View>
      <View style={layoutStyles.grow1} />
      <View>
        <FieldTitle>Первый день чистоты</FieldTitle>
        <View style={layoutStyles.row}>
          <DatePicker
            style={datePickerStyle}
            day={12}
            month={12}
            year={2012}
            dayContainerStyle={layoutStyles.dayMonthContainerStyle}
            monthContainerStyle={layoutStyles.dayMonthContainerStyle}
            yearContainerStyle={layoutStyles.yearContainerStyle}
          />
        </View>
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

const DAY_MONTH_BASIS = 85;
const YEAR_BASIS = 162;
const GAP = 3;
const CONTAINER_BASIS = DAY_MONTH_BASIS * 2 + YEAR_BASIS + GAP * 2;

const layoutStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  fixed: {
    flexGrow: 0,
    flexShrink: 1,
    minWidth: 0,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  wide: {
    flexBasis: 300,
  },
  wider: {
    flexBasis: CONTAINER_BASIS,
  },
  datePicker: {
    gap: GAP,
  },
  dayMonthContainerStyle: {
    flexBasis: DAY_MONTH_BASIS,
    flexGrow: DAY_MONTH_BASIS,
  },
  yearContainerStyle: {
    flexBasis: YEAR_BASIS,
    flexGrow: YEAR_BASIS,
  },
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

const fixedWide = [layoutStyles.fixed, layoutStyles.wide];

const datePickerStyle = [
  layoutStyles.datePicker,
  layoutStyles.fixed,
  layoutStyles.wider,
];

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
