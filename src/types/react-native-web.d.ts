import "react-native";

declare module "react-native" {
  export interface CommonWebViewProps {
    tabIndex?: number;
    dataSet?: Record<string, any>;
  }

  export interface ViewProps extends CommonWebViewProps {}

  export interface TextProps extends CommonWebViewProps {}
}
