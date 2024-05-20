import {RefObject, useCallback} from 'react';
import {ScrollView} from 'react-native';

import type _useGetOffset from './useGetOffset';

export default (function useGetOffset(scrollRef: RefObject<ScrollView>) {
  const getOffset = useCallback(() => {
    const scroll = scrollRef.current;
    if (scroll === null) {
      return undefined;
    }
    return (scroll.getScrollableNode() as HTMLElement).scrollLeft;
  }, [scrollRef]);
  return [getOffset];
} satisfies typeof _useGetOffset);
