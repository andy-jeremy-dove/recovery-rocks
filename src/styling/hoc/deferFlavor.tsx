import React, {forwardRef} from 'react';
import type {StyleProp} from 'react-native';

import type {Theme} from '../Theme';
import useTheme from '../Theme/useTheme';
import type {MemoCache} from '../util';
import memoize from '../util/memoize';
import type {StyleType} from './StyleType';

export default function deferFlavor<ComponentType extends Stylable>(
  config?: FlavorConfig<ComponentType>,
) {
  return <
      StyleEnumeration extends Record<
        keyof StyleEnumeration,
        StyleType<ComponentType>
      >,
      OverriddenProps extends Partial<
        React.ComponentProps<ComponentType>
      > = object,
    >(
      _enumerateStyles: (theme: Theme) => StyleEnumeration,
      _overrideProps?: (
        theme: Theme,
        styles: StyleEnumeration,
      ) => OverriddenProps,
    ) =>
    <PropsExtension extends object = object>(
      pickStyles: (
        styles: StyleEnumeration,
        props: React.ComponentProps<ComponentType> & PropsExtension,
        theme: Theme,
      ) => StyleProp<StyleType<ComponentType>>,
    ) =>
    (Component: ComponentType) => {
      const enumerateStyles = memoize(
        _enumerateStyles,
        config?.styleCache as MemoCache<Theme, StyleEnumeration> | undefined,
      );
      const overrideProps =
        _overrideProps &&
        memoize(
          _overrideProps,
          config?.propsCache as MemoCache<Theme, OverriddenProps> | undefined,
        );
      return forwardRef<
        React.ElementRef<ComponentType>,
        React.PropsWithChildren<
          Override<OverriddenProps, React.ComponentProps<ComponentType>> &
            PropsExtension
        >
      >((props, ref) => {
        const theme = useTheme();
        const styles = enumerateStyles(theme);
        const overriddenProps = overrideProps?.(theme, styles) ?? {};
        const _props = {
          ...overriddenProps,
          ...props,
        } as React.ComponentProps<ComponentType> & PropsExtension;
        const style = pickStyles(styles, _props, theme);
        return React.createElement(Component, {
          ..._props,
          ref,
          style: [style, _props.style],
        });
      });
    };
}

export type Override<
  Base extends Partial<Source>,
  Source extends object,
> = Partial<Pick<Source, Extract<keyof Base, keyof Source>>> &
  Pick<Source, Exclude<keyof Source, keyof Base>>;

export type Stylable = React.ComponentType<
  Record<string | number | symbol, unknown>
>;

export interface FlavorConfig<ComponentType extends Stylable> {
  styleCache?: MemoCache<
    Theme,
    Record<string | number | symbol, StyleType<ComponentType>>
  >;
  propsCache?: MemoCache<Theme, Partial<React.ComponentProps<ComponentType>>>;
}
