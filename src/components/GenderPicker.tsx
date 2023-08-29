import {variance} from "../styling";
import {Text, TextProps, View, ViewProps} from "react-native";
import {useCallback} from "react";

export enum Gender {
  Male,
  Female,
}

export type GenderPickerProps = {
  value: Gender;
  onChange?: (_: Gender) => void;
};

export function GenderPicker(props: GenderPickerProps) {
  const {value, onChange} = props;
  const setMale = useCallback(() => onChange?.(Gender.Male), [onChange]);
  const setFemale = useCallback(() => onChange?.(Gender.Female), [onChange]);
  return (
    <GenderPickerRow>
      <GenderPickerEntry
        tabIndex={0}
        checked={value === Gender.Male}
        aria-checked={value === Gender.Male}
        onPress={setMale}
      >
        Мужчина
      </GenderPickerEntry>
      <GenderPickerEntry
        tabIndex={0}
        checked={value === Gender.Female}
        aria-checked={value === Gender.Male}
        onPress={setFemale}
      >
        Женщина
      </GenderPickerEntry>
    </GenderPickerRow>
  );
}

const GenderPickerRow = variance(View)((theme) => ({
  root: {
    marginVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 1,
    borderWidth: 1,
    borderColor: theme.palette.borderSecondary,
    borderRadius: 12,
    backgroundColor: theme.palette.borderSecondary,
    overflow: 'hidden',
  },
}), (): ViewProps => ({
  role: 'radiogroup',
}));

const GenderPickerEntry = variance(Text)((theme) => ({
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
  },
  checked: {
    backgroundColor: theme.palette.backgroundAccent,
  },
}), (): TextProps => ({
  role: 'radio',
  selectable: false,
  accessible: true,
  suppressHighlighting: true,
}));
