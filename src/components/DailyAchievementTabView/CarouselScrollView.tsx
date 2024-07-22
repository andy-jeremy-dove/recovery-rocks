import React, {forwardRef, useMemo} from 'react';
import type {ScrollViewProps, ViewStyle} from 'react-native';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';

import type {TabsContextProps} from './DailyAchievementBinding';
import DailyAchievementBinding from './DailyAchievementBinding';
import type {Slide} from './useSlides';

export type CarouselScrollViewProps = {
  slides: readonly Slide[];
} & ScrollViewProps &
  TabsContextProps;

export default forwardRef<ScrollView, CarouselScrollViewProps>(
  function CarouselScrollView(props, ref) {
    const {slides, onPress, onPressIn, onPressOut, accretion, ...rest} = props;

    const slideCount = slides.length;

    const contentContainerStyle = useMemo<ViewStyle>(
      () => ({width: `${slideCount * 100}%`}),
      [slideCount],
    );

    return (
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled={Platform.OS !== 'web'}
        dataSet={carouselDataSet}
        contentContainerStyle={[
          layoutStyles.contentContainerStyle,
          contentContainerStyle,
        ]}
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        pinchGestureEnabled={false}
        automaticallyAdjustContentInsets={false}
        automaticallyAdjustKeyboardInsets={false}
        contentInsetAdjustmentBehavior="never"
        {...rest}>
        {slides.map(({key, props: daProps}) => (
          <View key={key} dataSet={slideDataSet} style={layoutStyles.slide}>
            <DailyAchievementBinding
              onPress={onPress}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              accretion={accretion}
              {...daProps}
            />
          </View>
        ))}
      </ScrollView>
    );
  },
);

const layoutStyles = StyleSheet.create({
  contentContainerStyle: {
    flexDirection: 'row',
  },
  slide: {
    flex: 1,
  },
});

const carouselDataSet = {
  'scroll-snap-type': 'x mandatory',
};

const slideDataSet = {
  'scroll-snap-align': 'start',
  'scroll-snap-stop': 'always',
};
