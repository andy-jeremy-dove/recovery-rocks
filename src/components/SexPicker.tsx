import {useCallback} from 'react';
import type {TextProps, ViewProps} from 'react-native';
import {Text, View} from 'react-native';

import {variance} from '../styling';

export enum Sex {
  Male,
  Female,
}

type SexPickerProps = ViewProps & {
  value: Sex;
  onChange?: (_: Sex) => void;
};

export default function SexPicker(props: SexPickerProps) {
  const {value, onChange, ...rest} = props;
  const setMale = useCallback(() => onChange?.(Sex.Male), [onChange]);
  const setFemale = useCallback(() => onChange?.(Sex.Female), [onChange]);
  return (
    <SexPickerRow {...rest}>
      <SexPickerEntry
        tabIndex={0}
        checked={value === Sex.Male}
        aria-checked={value === Sex.Male}
        onPress={setMale}>
        Мужчина
      </SexPickerEntry>
      <SexPickerEntry
        tabIndex={0}
        checked={value === Sex.Female}
        aria-checked={value === Sex.Male}
        onPress={setFemale}>
        Женщина
      </SexPickerEntry>
    </SexPickerRow>
  );
}

const SexPickerRow = variance(View)(
  theme => ({
    root: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 1,
      borderWidth: 1,
      borderColor: theme.palette.borderSecondary,
      borderRadius: 12,
      backgroundColor: theme.palette.borderSecondary,
      overflow: 'hidden',
    },
  }),
  (): ViewProps => ({
    role: 'radiogroup',
  }),
);

const SexPickerEntry = variance(Text)(
  theme => ({
    root: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      textAlign: 'center',
      ...theme.fontByWeight('400'),
      color: theme.palette.textPrimary,
      fontSize: 20,
      lineHeight: 26,
      backgroundColor: theme.palette.background,
      userSelect: 'none',
    },
    checked: {
      backgroundColor: theme.palette.backgroundSelection,
    },
  }),
  (): TextProps => ({
    role: 'radio',
    accessible: true,
    suppressHighlighting: true,
  }),
);
