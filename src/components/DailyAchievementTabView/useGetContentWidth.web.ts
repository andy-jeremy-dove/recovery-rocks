import {observable, runInAction} from 'mobx';
import type {RefObject} from 'react';
import {useCallback, useEffect, useState} from 'react';
import type {ScrollView} from 'react-native';

import {ProxyObservableElementImpl} from '../../ObservableElement';
import type {UseGetContentWidth} from './useGetContentWidth';

const useGetContentWidth = function useGetContentWidth(
  scrollRef: RefObject<ScrollView>,
) {
  const [element] = useState(
    () =>
      new ProxyObservableElementImpl(
        () =>
          (scrollRef.current?.getScrollableNode() as HTMLElement | undefined) ??
          undefined,
      ),
  );
  useEffect(
    () => () => {
      element[Symbol.dispose]();
    },
    [element],
  );

  const getScrollWidth = useCallback(() => element.scrollWidth, [element]);

  return [getScrollWidth];
} satisfies UseGetContentWidth;

const useFallbackGetContentWidth = function useFallbackGetContentWidth(
  scrollRef: RefObject<ScrollView>,
) {
  const [contentWidth] = useState(() => observable.box<number>());
  const getContentWidth = useCallback(() => {
    contentWidth.get();
    if (scrollRef.current === null) {
      return undefined;
    }
    return (scrollRef.current.getScrollableNode() as HTMLDivElement)
      .scrollWidth;
  }, [contentWidth, scrollRef]);
  const onContentSizeChange = useCallback(
    (width: number) => {
      runInAction(() => {
        contentWidth.set(width);
      });
    },
    [contentWidth],
  );
  return [getContentWidth, onContentSizeChange];
} satisfies UseGetContentWidth;

export default 'ResizeObserver' in window
  ? useGetContentWidth
  : useFallbackGetContentWidth;
