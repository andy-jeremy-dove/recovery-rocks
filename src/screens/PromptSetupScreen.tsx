import {useCallback, useMemo, useState} from 'react';
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import BackgroundView from '../components/BackgroundView';
import BasicButtonText from '../components/BasicButtonText';
import ContentScrollView from '../components/ContentScrollView';
import DatePicker from '../components/DatePicker';
import GenderPicker, {Gender} from '../components/GenderPicker';
import {fillSpace} from '../styles';
import {variance} from '../styling';

export type SetupScreenProps = {
  cancellation?: boolean;
  onCancel?: () => void;
  compensateHeaderHeight?: number;
};

export default function PromptSetupScreen(props: SetupScreenProps) {
  const {compensateHeaderHeight, cancellation, onCancel} = props;
  const [gender, setGender] = useState(Gender.Male);
  const onPress = useCallback(() => {
    Keyboard.dismiss();
  }, []);
  const topStyle: StyleProp<ViewStyle> = useMemo(
    () => [
      layoutStyles.grow3,
      {
        minHeight: compensateHeaderHeight,
        flexBasis: compensateHeaderHeight ?? 0,
      },
    ],
    [compensateHeaderHeight],
  );
  const topIsCompensated = compensateHeaderHeight !== undefined;
  return (
    <ContentScrollView topIsCompensated={topIsCompensated}>
      <BackgroundView />
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
      <View style={layoutStyles.grow2} />
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
      <View style={layoutStyles.grow4} />
      <View>
        <BasicButtonText
          style={layoutStyles.submitButton}
          tabIndex={0}
          onPress={onPress}>
          Готово
        </BasicButtonText>
        {cancellation && (
          <BasicButtonText
            style={layoutStyles.submitButton}
            tabIndex={0}
            onPress={onCancel}>
            Отмена
          </BasicButtonText>
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
    flexDirection: 'row',
    justifyContent: 'center',
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
  submitButton: {
    alignSelf: 'center',
    marginVertical: 8,
    minWidth: 160,
  },
  grow2: fillSpace(2),
  grow3: fillSpace(3),
  grow4: fillSpace(4),
  grow7: fillSpace(7),
});

const fixedWide = [layoutStyles.fixed, layoutStyles.wide];

const datePickerStyle = [
  layoutStyles.datePicker,
  layoutStyles.fixed,
  layoutStyles.wider,
];

const FieldTitle = variance(Text)(theme => ({
  root: {
    marginVertical: 8,
    textAlign: 'center',
    ...theme.fontByWeight('400'),
    color: theme.palette.textPrimary,
    fontSize: 20,
    lineHeight: 26,
    userSelect: 'none',
  },
  secondary: {
    color: theme.palette.textSecondary,
  },
}));

const NameInput = variance(TextInput)(
  theme => ({
    root: {
      borderWidth: 1,
      borderColor: theme.palette.borderSecondary,
      borderRadius: 12,
      paddingVertical: 8,
      paddingHorizontal: 16,
      ...theme.fontByWeight('400'),
      color: theme.palette.textPrimary,
      fontSize: 20,
      lineHeight: 26,
    },
  }),
  (theme): TextInputProps => ({
    inputMode: 'text',
    autoComplete: 'name',
    autoCorrect: true,
    hitSlop,
    keyboardAppearance: theme.isDark ? 'dark' : 'light',
  }),
);

const hitSlop = {left: 16, top: 8, right: 16, bottom: 8} as const;
