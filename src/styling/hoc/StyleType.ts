import type React from 'react';
import type {StyleProp} from 'react-native';

export type StyleType<
  ComponentType extends React.ComponentType<
    Record<string | number | symbol, unknown>
  >,
  StylePropKey extends keyof React.ComponentProps<ComponentType> = 'style',
> =
  React.ComponentProps<ComponentType>[StylePropKey] extends StyleProp<infer S>
    ? S
    : never;
