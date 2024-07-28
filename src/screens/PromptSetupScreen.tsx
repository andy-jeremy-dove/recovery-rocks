import {comparer} from 'mobx';
import {observer} from 'mobx-react-lite';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {StyleProp, TextInputProps, ViewStyle} from 'react-native';
import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';

import BackgroundView from '../components/BackgroundView';
import BasicButtonText from '../components/BasicButtonText';
import ContentScrollView from '../components/ContentScrollView';
import DatePicker from '../components/DatePicker';
import SexPicker, {Sex} from '../components/SexPicker';
import {type DateRecord, fromTimestamp} from '../DateRecord';
import type {_Object} from '../Paramut';
import {useRoot} from '../Root';
import {fillSpace} from '../styles';
import {variance} from '../styling';
import type {Time} from '../Time';

export type SetupScreenProps = {
  cancellation?: boolean;
  onCancel?: () => void;
  compensateHeaderHeight?: number;
  formState?: Partial<ProfileFormState>;
  onSubmit?: (_: ProfileFormState) => void;
};

export type ProfileFormState<Mut extends boolean = false> = _Object<
  {
    name: string;
    sex: Sex;
    start: DateRecord<Mut>;
  },
  Mut
>;

export default observer(function PromptSetupScreen(props: SetupScreenProps) {
  const {
    compensateHeaderHeight,
    cancellation,
    onCancel,
    formState: foreignFormState,
    onSubmit,
  } = props;
  const root = useRoot();
  const [localFormState, setFormState] = useState(() =>
    createFormState(root, foreignFormState),
  );
  const firstRunRef = useRef(true);
  useEffect(() => {
    if (firstRunRef.current) {
      return;
    }
    if (foreignFormState) {
      setFormState(createFormState(root, foreignFormState));
    }
  }, [foreignFormState, root]);
  useEffect(() => {
    firstRunRef.current = false;
  }, []);
  const setName = useCallback((name: string) => {
    setFormState(_ => {
      if (Object.is(_.name, name)) {
        return _;
      }
      return {..._, name};
    });
  }, []);
  const setSex = useCallback((sex: Sex) => {
    setFormState(_ => {
      if (Object.is(_.sex, sex)) {
        return _;
      }
      return {..._, sex};
    });
  }, []);
  const setStart = useCallback((start: DateRecord) => {
    setFormState(_ => {
      if (comparer.shallow(_.start, start)) {
        return _;
      }
      return {..._, start};
    });
  }, []);
  const onPress = useCallback(() => {
    onSubmit?.(localFormState);
    Keyboard.dismiss();
  }, [localFormState, onSubmit]);
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
          <NameTextInput
            style={fixedWide}
            tabIndex={0}
            value={localFormState.name}
            onChangeText={setName}
          />
        </View>
        <View style={layoutStyles.row}>
          <SexPicker
            style={fixedWide}
            value={localFormState.sex}
            onChange={setSex}
          />
        </View>
      </View>
      <View style={layoutStyles.grow2} />
      <View>
        <FieldTitle>Первый день чистоты</FieldTitle>
        <View style={layoutStyles.row}>
          <DatePicker
            style={datePickerStyle}
            value={localFormState.start}
            onChange={setStart}
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
});

function createFormState(
  root: {readonly time: Time},
  _?: Partial<ProfileFormState>,
): ProfileFormState<true> {
  return {
    name: _?.name ?? '',
    sex: _?.sex ?? Sex.Male,
    start: _?.start ?? fromTimestamp(root.time.now()),
  };
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

const NameTextInput = variance(TextInput)(
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
