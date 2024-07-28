import {observer} from 'mobx-react-lite';
import {useCallback, useEffect, useRef, useState} from 'react';
import type {
  StyleProp,
  TextInputProps,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {TextInput, View} from 'react-native';

import {dateInvariant} from '../Date';
import type {DateRecord} from '../DateRecord';
import fromTimestamp from '../DateRecord/fromTimestamp';
import type {_Object} from '../Paramut';
import {useRoot} from '../Root';
import {variance} from '../styling';
import type {NaturalRange} from '../util/Range';

export type DatePickerProps = {
  value: DateRecord;
  onChange: (_: DateRecord<true>) => void;
  dayContainerStyle?: StyleProp<ViewStyle>;
  monthContainerStyle?: StyleProp<ViewStyle>;
  yearContainerStyle?: StyleProp<ViewStyle>;
} & ViewProps;

export default observer(function DatePicker(props: DatePickerProps) {
  const {
    value,
    onChange,
    dayContainerStyle,
    monthContainerStyle,
    yearContainerStyle,
    ...rest
  } = props;
  const root = useRoot();
  const [formState, setFormState] = useState(() => {
    try {
      return toDatePickerState(value);
    } catch {
      const record = fromTimestamp(root.time.now());
      return toDatePickerState(record);
    }
  });
  const setDay = useCallback((_day: string) => {
    const day = formatDayOrMonth(_day);
    setFormState(_ => {
      if (Object.is(_.day, day)) {
        return _;
      }
      return {..._, day};
    });
  }, []);
  const setMonth = useCallback((_month: string) => {
    const month = formatDayOrMonth(_month);
    setFormState(_ => {
      if (Object.is(_.month, month)) {
        return _;
      }
      return {..._, month};
    });
  }, []);
  const setYear = useCallback((_year: string) => {
    const year = formatYear(_year);
    setFormState(_ => {
      if (Object.is(_.year, year)) {
        return _;
      }
      return {..._, year};
    });
  }, []);
  const firstRunRef = useRef(true);
  const {day, month, year} = value;
  useEffect(() => {
    if (firstRunRef.current) {
      return;
    }
    try {
      setFormState(toDatePickerState({day, month, year}));
    } catch (error) {
      /* empty */
    }
  }, [day, month, year]);
  useEffect(() => {
    if (firstRunRef.current) {
      return;
    }
    try {
      onChange(fromDatePickerState(formState));
    } catch (error) {
      /* empty */
    }
  }, [formState, onChange]);
  useEffect(() => {
    firstRunRef.current = false;
  }, []);
  return (
    <Root {...rest}>
      <NumberView style={dayContainerStyle}>
        <NumberText value={formState.day} onChangeText={setDay} />
      </NumberView>
      <NumberView style={monthContainerStyle}>
        <NumberText value={formState.month} onChangeText={setMonth} />
      </NumberView>
      <NumberView double style={yearContainerStyle}>
        <NumberText value={formState.year} onChangeText={setYear} />
      </NumberView>
    </Root>
  );
});

type DatePickerState<Mut extends boolean = false> = _Object<
  {
    day: string;
    month: string;
    year: string;
  },
  Mut
>;

function toDatePickerState(_: DateRecord): DatePickerState<true> {
  dateInvariant(_.day, _.month, _.year);
  return {
    day: formatDayOrMonth(_.day.toString()),
    month: formatDayOrMonth((_.month + 1).toString()),
    year: formatYear(_.year.toString()),
  };
}

function formatDayOrMonth(_: string): string {
  return _.padStart(2, '0').slice(-2);
}

function formatYear(_: string): string {
  return _.slice(-4);
}

function fromDatePickerState(_: DatePickerState): DateRecord<true> {
  const day = parseInt(_.day, 10);
  const month = parseInt(_.month, 10) - 1;
  const year = parseInt(_.year, 10);
  dateInvariant(day, month, year);
  return {day: day as NaturalRange<31>, month, year};
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
      ...theme.text('time'),
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
