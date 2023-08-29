import {TextInput, TextInputProps, View, ViewProps} from "react-native";
import {variance} from "../styling";

export type DatePickerProps = {
  day: number;
  month: number;
  year: number;
} & ViewProps;

export function DatePicker(props: DatePickerProps) {
  const {day, month, year, ...rest} = props;
  return (
    <Root {...rest}>
      <NumberView>
        <NumberText defaultValue={day.toString()} />
      </NumberView>
      <NumberView>
        <NumberText defaultValue={month.toString()} />
      </NumberView>
      <NumberView double>
        <NumberText defaultValue={year.toString()} />
      </NumberView>
    </Root>
  );
}

const GAP = 2;

// fixme theme not used
const Root = variance(View)(() => ({
  root: {
    flexDirection: 'row',
    gap: GAP,
    flexWrap: 'wrap',
  },
}));

const BASE = (300 - GAP * 2) / 4;

const NumberView = variance(View)((theme) => ({
  root: {
    flexBasis: BASE,
    flexGrow: 1,
    flexShrink: 0,
    alignItems: 'stretch',
  },
  double: {
    flexBasis: BASE * 2,
    flexGrow: 2,
    flexShrink: 0,
  },
}));

const NumberText = variance(TextInput)((theme) => ({
  root: {
    paddingVertical: 8,
    paddingHorizontal: 4,

    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.palette.borderSecondary,

    textAlign: 'center',
    ...theme.fontByWeight('bold'),
    fontSize: 53,
    lineHeight: 64,
  },
}), (theme): TextInputProps => ({
  textAlign: 'center',
  textAlignVertical: 'center',
  inputMode: 'decimal',
  keyboardAppearance: theme.isDark ? 'dark' : 'light',
}));
