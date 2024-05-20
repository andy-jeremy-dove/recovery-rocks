import {observable, runInAction} from 'mobx';
import {RefObject, useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import type _useGetContentWidth from './useGetContentWidth';
import {ProxyObservableElementImpl} from '../../ObservableElement';

const useGetContentWidth = ((scrollRef: RefObject<ScrollView>) => {
  const [element] = useState(
    () =>
      new ProxyObservableElementImpl(
        () => scrollRef.current?.getScrollableNode() ?? undefined,
      ),
  );
  useEffect(() => () => element[Symbol.dispose](), [element]);

  const getScrollWidth = useCallback(() => element.scrollWidth, [element]);

  return [getScrollWidth];
}) satisfies typeof _useGetContentWidth;

const useFallbackGetContentWidth = ((
  scrollRef: RefObject<ScrollView>,
): ReturnType<typeof _useGetContentWidth> => {
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
    (width: number) => runInAction(() => contentWidth.set(width)),
    [contentWidth],
  );
  return [getContentWidth, onContentSizeChange];
}) satisfies typeof _useGetContentWidth;

export default ('ResizeObserver' in window
  ? useGetContentWidth
  : useFallbackGetContentWidth) as typeof _useGetContentWidth;
