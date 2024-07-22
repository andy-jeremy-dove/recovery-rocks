import type {RefObject} from 'react';
import {useCallback} from 'react';
import type {ScrollView} from 'react-native';

import type {UseGetOffset} from './useGetOffset';

export default (function useGetOffset(scrollRef: RefObject<ScrollView>) {
  const getOffset = useCallback(() => {
    const scroll = scrollRef.current;
    if (scroll === null) {
      return undefined;
    }
    return (scroll.getScrollableNode() as HTMLElement).scrollLeft;
  }, [scrollRef]);
  return [getOffset];
} satisfies UseGetOffset);
