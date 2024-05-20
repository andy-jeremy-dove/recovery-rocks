import {reaction} from 'mobx';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useLayoutEffect} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
} from 'react-native';

import CarouselScrollView from './CarouselScrollView';
import {DailyAchievementTabViewProps} from './DailyAchievementTabViewProps';
import getVisibleIndex from './getVisibleIndex';
import useGetContentWidth from './useGetContentWidth';
import useGetOffset from './useGetOffset';
import useScrollEndEffect from './useScrollEndEffect';
import useSlides from './useSlides';
import {lightImpact} from '../../haptics';
import {useObservableRef} from '../../mobx-react-toolbox';

export default observer(function ActualDailyAchievementTabView(
  props: DailyAchievementTabViewProps,
) {
  const {getTabKey, setTabKey, dailyAchievement, accretion, ...rest} = props;

  const [slides, getIndex, setIndex] = useSlides(
    dailyAchievement,
    getTabKey,
    setTabKey,
  );
  const slideCount = slides.length;

  const scrollRef = useObservableRef<ScrollView>(null);
  const [getOffset, setOffset] = useGetOffset(scrollRef);
  const [getContentWidth, onContentSizeChange] = useGetContentWidth(scrollRef);

  const processFinalOffset = useCallback(
    (offset: number) => {
      setOffset?.(offset);
      const width = getContentWidth();
      if (width === undefined) {
        return;
      }
      const index = getVisibleIndex(offset, width, slideCount);
      const isExactlyAtSnappingPoint = Number.isInteger(index);
      if (isExactlyAtSnappingPoint) {
        setIndex(index);
        if (Platform.OS === 'ios') {
          lightImpact();
        }
      }
    },
    [setOffset, getContentWidth, slideCount, setIndex],
  );

  const onScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      processFinalOffset(event.nativeEvent.contentOffset.x);
    },
    [processFinalOffset],
  );

  const onPress = useCallback(
    () => setIndex((getIndex() + 1) % slideCount),
    [setIndex, getIndex, slideCount],
  );

  useScrollEndEffect(scrollRef, processFinalOffset);

  useLayoutEffect(
    () =>
      reaction(
        () => [scrollRef.current, getContentWidth(), getIndex()] as const,
        (current, previous) => {
          const [scroll, width, index] = current;
          const offset = getOffset() ?? 0;
          if (scroll === null || width === undefined) {
            return;
          }
          const [_scroll, _width] = previous ?? [];

          if (index !== getVisibleIndex(offset, width, slideCount)) {
            const x = (index * width) / slideCount;
            const layoutRemainsTheSame =
              Object.is(scroll, _scroll) && Object.is(width, _width);
            scroll.scrollTo({x, animated: layoutRemainsTheSame});
            setOffset?.(x);
          }
        },
        {name: 'TabView#scroll', fireImmediately: true},
      ),
    [getContentWidth, getIndex, getOffset, scrollRef, setOffset, slideCount],
  );

  return (
    <CarouselScrollView
      ref={scrollRef}
      slides={slides}
      onPress={onPress}
      onPressIn={Platform.OS === 'ios' ? lightImpact : undefined}
      accretion={accretion}
      onScrollEndDrag={onScrollEnd}
      onMomentumScrollEnd={onScrollEnd}
      onContentSizeChange={onContentSizeChange}
      {...rest}
    />
  );
});