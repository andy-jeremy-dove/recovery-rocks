import {useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';

import getRussianPluralCategory from '../i18n/getRussianPluralCategory';
import {flavor} from '../styling';

export type TimeUnitViewProps = ViewProps & {
  value: number;
  unit: TimeUnit;
  plural?: Plural;
  /**
   * Наращение порядкового числительного: 1 день -> 1-й день
   * */
  accretion?: boolean;
  valueTextStyle?: StyleProp<TextStyle>;
  scale?: number;
};

export enum TimeUnit {
  Day,
  Month,
  Year,
}

export enum Plural {
  Cardinal,
  Ordinal,
}

export default function TimeUnitView(props: TimeUnitViewProps) {
  const {
    value,
    unit,
    plural = Plural.Cardinal,
    accretion = false,
    valueTextStyle,
    scale,
    style,
    ...rest
  } = props;
  const rootStyle = useMemo(() => [layoutStyles.root, style], [style]);
  const category =
    plural === Plural.Cardinal ? getRussianPluralCategory(value) : 'one';
  const unitText = textsByUnit[unit][category];
  return (
    <View style={rootStyle} {...rest}>
      <View style={layoutStyles.valueRow}>
        <ValueText scale={scale} style={valueTextStyle}>
          {value}
        </ValueText>
        {plural === Plural.Ordinal && accretion ? (
          <AccretionText scale={scale} style={valueTextStyle}>
            -й
          </AccretionText>
        ) : null}
      </View>
      <UnitText scale={scale}>{unitText}</UnitText>
    </View>
  );
}

const layoutStyles = StyleSheet.create({
  root: {},
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
});

const VALUE_FONT_SIZE = 75;
const VALUE_LINE_HEIGHT = 90;

const ValueText = flavor(Text)(theme => ({
  root: {
    textAlign: 'center',
    ...theme.fontByWeight('800'),
    color: theme.palette.textPrimary,
    fontSize: VALUE_FONT_SIZE,
    lineHeight: VALUE_LINE_HEIGHT,
  },
}))<ScalingTextProps>((styles, props) => [
  styles.root,
  props.scale !== undefined &&
    scaledText(VALUE_FONT_SIZE, VALUE_LINE_HEIGHT, props.scale),
]);

const ACCRETION_FONT_SIZE = VALUE_FONT_SIZE / 3;
const ACCRETION_LINE_HEIGHT = VALUE_LINE_HEIGHT / 3;

const AccretionText = flavor(Text)(theme => ({
  root: {
    textAlign: 'center',
    ...theme.fontByWeight('400'),
    color: theme.palette.textPrimary,
    fontSize: ACCRETION_FONT_SIZE,
    lineHeight: ACCRETION_LINE_HEIGHT,
  },
}))<ScalingTextProps>((styles, props) => [
  styles.root,
  props.scale !== undefined &&
    scaledText(ACCRETION_FONT_SIZE, ACCRETION_LINE_HEIGHT, props.scale),
]);

const UNIT_FONT_SIZE = 15;
const UNIT_LINE_HEIGHT = 18;
const UNIT_MARGIN_TOP = -UNIT_LINE_HEIGHT / 2;

const UnitText = flavor(Text)(theme => ({
  root: {
    marginTop: UNIT_MARGIN_TOP,
    textAlign: 'center',
    ...theme.fontByWeight('400'),
    color: theme.palette.textPrimary,
    fontSize: UNIT_FONT_SIZE,
    lineHeight: UNIT_LINE_HEIGHT,
  },
}))<ScalingTextProps>((styles, props) => [
  styles.root,
  props.scale !== undefined &&
    scaledText(UNIT_FONT_SIZE, UNIT_LINE_HEIGHT, props.scale),
]);

type ScalingTextProps = {
  scale?: number;
};

function scaledText(
  fontSize: number,
  lineHeight: number,
  scale: number = 1,
): TextStyle {
  return {
    fontSize: Math.floor(fontSize * scale),
    lineHeight: Math.floor(lineHeight * scale),
  };
}

export const TIME_UNIT_VIEW_HEIGHT =
  VALUE_LINE_HEIGHT + UNIT_MARGIN_TOP + UNIT_LINE_HEIGHT;

const dayByCategory = {
  one: 'день',
  few: 'дня',
  many: 'дней',
  other: 'дня',
};

const monthByCategory = {
  one: 'месяц',
  few: 'месяца',
  many: 'месяцев',
  other: 'месяца',
};

const yearByCategory = {
  one: 'год',
  few: 'года',
  many: 'лет',
  other: 'года',
};

const textsByUnit = {
  [TimeUnit.Day]: dayByCategory,
  [TimeUnit.Month]: monthByCategory,
  [TimeUnit.Year]: yearByCategory,
};
