import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import type React from 'react';
import {isValidElementType} from 'react-is';
import type {StyleProp} from 'react-native';

import type {Theme} from '../Theme';
import type {FlavorConfig, Override, Stylable} from './deferFlavor';
import deferFlavor from './deferFlavor';
import type {StyleType} from './StyleType';

function flavor<ComponentType extends Stylable>(
  config?: FlavorConfig<ComponentType>,
): <
  StyleEnumeration extends Record<
    keyof StyleEnumeration,
    StyleType<ComponentType>
  >,
  OverriddenProps extends Partial<React.ComponentProps<ComponentType>> = object,
>(
  _enumerateStyles: (theme: Theme) => StyleEnumeration,
  _overrideProps?: (theme: Theme, styles: StyleEnumeration) => OverriddenProps,
) => <PropsExtension extends object = object>(
  pickStyles: (
    styles: StyleEnumeration,
    props: React.ComponentProps<ComponentType> & PropsExtension,
    theme: Theme,
  ) => StyleProp<StyleType<ComponentType>>,
) => (
  Component: ComponentType,
) => FlavoredComponent<ComponentType, OverriddenProps, PropsExtension>;
function flavor<ComponentType extends Stylable>(
  Component: ComponentType,
  config?: FlavorConfig<ComponentType>,
): <
  StyleEnumeration extends Record<
    keyof StyleEnumeration,
    StyleType<ComponentType>
  >,
  OverriddenProps extends Partial<React.ComponentProps<ComponentType>> = object,
>(
  _enumerateStyles: (theme: Theme) => StyleEnumeration,
  _overrideProps?: (theme: Theme, styles: StyleEnumeration) => OverriddenProps,
) => <PropsExtension extends object = object>(
  pickStyles: (
    styles: StyleEnumeration,
    props: React.ComponentProps<ComponentType> & PropsExtension,
    theme: Theme,
  ) => StyleProp<StyleType<ComponentType>>,
) => FlavoredComponent<ComponentType, OverriddenProps, PropsExtension>;
function flavor<ComponentType extends Stylable>(
  configOrComponent?: FlavorConfig<ComponentType> | ComponentType,
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
    ):
      | FlavoredComponent<ComponentType, OverriddenProps, PropsExtension>
      | ((
          Component: ComponentType,
        ) => FlavoredComponent<
          ComponentType,
          OverriddenProps,
          PropsExtension
        >) =>
      isComponent<ComponentType>(configOrComponent)
        ? deferFlavor(config)(_enumerateStyles, _overrideProps)(pickStyles)(
            configOrComponent,
          )
        : deferFlavor(
            configOrComponent as FlavorConfig<ComponentType> | undefined,
          )(
            _enumerateStyles,
            _overrideProps,
          )(pickStyles);
}

export default flavor;

export type FlavoredComponent<
  ComponentType extends Stylable,
  OverriddenProps extends Partial<React.ComponentProps<ComponentType>>,
  PropsExtension extends object,
> = ForwardRefExoticComponent<
  PropsWithoutRef<
    React.PropsWithChildren<
      Override<OverriddenProps, React.ComponentProps<ComponentType>> &
        PropsExtension
    >
  > &
    RefAttributes<React.ElementRef<ComponentType>>
>;

export const isComponent = <ComponentType extends Stylable>(
  configOrComponent?: FlavorConfig<ComponentType> | ComponentType,
): configOrComponent is ComponentType => isValidElementType(configOrComponent);
