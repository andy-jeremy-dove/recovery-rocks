import React from "react";

import { StyleType } from "./StyleType";
import deferFlavor, { FlavorConfig, Stylable } from "./deferFlavor";
import { FlavoredComponent, isComponent } from "./flavor";
import { Theme } from "../Theme";

export type PropsExtension<
  ComponentType extends Stylable,
  StyleEnumeration extends Record<
    keyof StyleEnumeration | "root",
    StyleType<ComponentType>
  >,
> = Partial<Record<Exclude<keyof StyleEnumeration, "root">, boolean>>;

function variance<ComponentType extends Stylable>(
  config?: FlavorConfig<ComponentType>,
): <
  StyleEnumeration extends Record<
    keyof StyleEnumeration | "root",
    StyleType<ComponentType>
  >,
  OverriddenProps extends Partial<React.ComponentProps<ComponentType>> = object,
>(
  _enumerateStyles: (theme: Theme) => StyleEnumeration,
  _overrideProps?: (theme: Theme, styles: StyleEnumeration) => OverriddenProps,
) => (
  Component: ComponentType,
) => FlavoredComponent<
  ComponentType,
  OverriddenProps,
  PropsExtension<ComponentType, StyleEnumeration>
>;
function variance<ComponentType extends Stylable>(
  Component: ComponentType,
  config?: FlavorConfig<ComponentType>,
): <
  StyleEnumeration extends Record<
    keyof StyleEnumeration | "root",
    StyleType<ComponentType>
  >,
  OverriddenProps extends Partial<React.ComponentProps<ComponentType>> = object,
>(
  _enumerateStyles: (theme: Theme) => StyleEnumeration,
  _overrideProps?: (theme: Theme, styles: StyleEnumeration) => OverriddenProps,
) => FlavoredComponent<
  ComponentType,
  OverriddenProps,
  PropsExtension<ComponentType, StyleEnumeration>
>;
function variance<ComponentType extends Stylable>(
  configOrComponent?: FlavorConfig<ComponentType> | ComponentType,
  config?: FlavorConfig<ComponentType>,
) {
  return <
    StyleEnumeration extends Record<
      keyof StyleEnumeration | "root",
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
  ):
    | FlavoredComponent<
        ComponentType,
        OverriddenProps,
        PropsExtension<ComponentType, StyleEnumeration>
      >
    | ((
        Component: ComponentType,
      ) => FlavoredComponent<
        ComponentType,
        OverriddenProps,
        PropsExtension<ComponentType, StyleEnumeration>
      >) => {
    const pickStyles = (
      styles: StyleEnumeration,
      props: React.ComponentProps<ComponentType> &
        PropsExtension<ComponentType, StyleEnumeration>,
    ) => {
      const result = [styles.root];
      for (const _prop in styles) {
        if (styles.hasOwnProperty(_prop)) {
          const prop = _prop as keyof StyleEnumeration;
          if (prop !== "root") {
            if (
              props[prop as Exclude<keyof StyleEnumeration, "root">] === true
            ) {
              result.push(styles[prop]);
            }
          }
        }
      }
      return result;
    };
    return isComponent<ComponentType>(configOrComponent)
      ? deferFlavor(config)(_enumerateStyles, _overrideProps)(pickStyles)(
          configOrComponent,
        )
      : deferFlavor(
          configOrComponent as FlavorConfig<ComponentType> | undefined,
        )(
          _enumerateStyles,
          _overrideProps,
        )(pickStyles);
  };
}

export default variance;
