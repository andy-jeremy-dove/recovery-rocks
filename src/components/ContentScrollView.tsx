import {useMemo} from 'react';
import type {ScrollViewProps, StyleProp, ViewStyle} from 'react-native';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import type {Edges} from 'react-native-safe-area-context';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useStyles, variance} from '../styling';

export type ContentScrollViewProps = ScrollViewProps & {
  topIsCompensated?: boolean;
  rootStyle?: StyleProp<ViewStyle>;
};

export default function ContentScrollView(props: ContentScrollViewProps) {
  const {
    topIsCompensated,
    rootStyle,
    children,
    contentContainerStyle,
    ...rest
  } = props;
  const styles = useStyles(theme => ({
    contentContainer: {
      flexGrow: 1,
      flexShrink: 0,
      alignItems: 'stretch',
      backgroundColor: theme.palette.background,
    },
  }));
  const _contentContainerStyle = useMemo(
    () => [styles.contentContainer, contentContainerStyle],
    [contentContainerStyle, styles],
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={layoutStyles.root}>
      <Content contentContainerStyle={_contentContainerStyle} {...rest}>
        <SafeAreaView
          mode="padding"
          style={[layoutStyles.root, rootStyle]}
          edges={topIsCompensated ? excludeTop : undefined}>
          {children}
        </SafeAreaView>
      </Content>
    </KeyboardAvoidingView>
  );
}

const excludeTop: Edges = ['left', 'right', 'bottom'];

const layoutStyles = StyleSheet.create({
  root: {
    flex: 0,
    flexGrow: 1,
    flexShrink: 0,
  },
});

const Content = variance(ScrollView)(
  theme => ({
    root: {
      flex: 1,
      flexWrap: 'nowrap',
      backgroundColor: theme.palette.background,
    },
  }),
  (theme): ScrollViewProps => ({
    alwaysBounceVertical: false,
    automaticallyAdjustContentInsets: false,
    automaticallyAdjustKeyboardInsets: false,
    contentInsetAdjustmentBehavior: 'never',
    indicatorStyle: theme.isDark ? 'white' : 'black',
    pinchGestureEnabled: false,
    overScrollMode: 'never',
    keyboardShouldPersistTaps: 'handled',
  }),
);
