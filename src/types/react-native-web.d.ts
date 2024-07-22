import 'react-native';

declare module 'react-native' {
  export interface CommonWebViewProps {
    tabIndex?: number;
    dataSet?: Readonly<Record<string, unknown>>;
  }

  export interface ViewProps extends CommonWebViewProps {}

  export interface TextProps extends CommonWebViewProps {}

  export interface PressableStateCallbackType {
    readonly focused: boolean;
    readonly hovered: boolean;
    readonly pressed: boolean;
  }
}
