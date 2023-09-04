import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import {variance} from '../styling';

export type DatePickerProps = {
  day: number;
  month: number;
  year: number;
  dayContainerStyle?: StyleProp<ViewStyle>;
  monthContainerStyle?: StyleProp<ViewStyle>;
  yearContainerStyle?: StyleProp<ViewStyle>;
} & ViewProps;

export default function DatePicker(props: DatePickerProps) {
  const {
    day,
    month,
    year,
    dayContainerStyle,
    monthContainerStyle,
    yearContainerStyle,
    ...rest
  } = props;
  return (
    <Root {...rest}>
      <NumberView style={dayContainerStyle}>
        <NumberText defaultValue={day.toString()} />
      </NumberView>
      <NumberView style={monthContainerStyle}>
        <NumberText defaultValue={month.toString()} />
      </NumberView>
      <NumberView double style={yearContainerStyle}>
        <NumberText defaultValue={year.toString()} />
      </NumberView>
    </Root>
  );
}

const Root = variance(View)(() => ({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 3,
    flexWrap: 'wrap',
  },
}));

const NumberView = variance(View)(() => ({
  root: {
    flexBasis: 1,
    flexGrow: 1,
    flexShrink: 0,
    alignItems: 'stretch',
  },
  double: {
    flexBasis: 2,
    flexGrow: 2,
    flexShrink: 0,
  },
}));

const NumberText = variance(TextInput)(
  theme => ({
    root: {
      paddingVertical: 8,
      paddingHorizontal: 4,

      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.palette.borderSecondary,

      textAlign: 'center',
      ...theme.fontByWeight('bold'),
      color: theme.palette.textPrimary,
      fontSize: 53,
      lineHeight: 64,
    },
  }),
  (theme): TextInputProps => ({
    textAlign: 'center',
    textAlignVertical: 'center',
    inputMode: 'decimal',
    keyboardAppearance: theme.isDark ? 'dark' : 'light',
  }),
);
