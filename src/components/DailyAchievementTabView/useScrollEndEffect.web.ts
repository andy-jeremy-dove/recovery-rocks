import {autorun} from 'mobx';
import {useEffect} from 'react';

import getVisibleIndex from './getVisibleIndex';
import type {UseScrollEndEffect} from './useScrollEndEffect';

export default (function useScrollEndEffect(
  ...[scrollRef, onScrollEnd]: Parameters<UseScrollEndEffect>
): ReturnType<UseScrollEndEffect> {
  useEffect(() => {
    const stack = new DisposableStack();
    let controller: AbortController | undefined;
    stack.defer(
      autorun(() => {
        controller?.abort();
        const scroll = scrollRef.current;
        if (!scroll) {
          return;
        }
        controller = new AbortController();
        listen(
          scroll.getScrollableNode() as HTMLDivElement,
          onScrollEnd,
          controller.signal,
        );
      }),
    );
    stack.defer(() => controller?.abort());
    return () => {
      stack.dispose();
    };
  }, [onScrollEnd, scrollRef]);
} satisfies UseScrollEndEffect);

function listen(
  div: HTMLDivElement,
  onScrollEnd: Parameters<UseScrollEndEffect>[1],
  signal: AbortSignal,
) {
  const options = {passive: true, capture: false, signal};
  const isSupported: boolean = 'onscrollend' in div;
  if (isSupported) {
    div.addEventListener(
      'scrollend',
      event => {
        if (event.eventPhase === Event.AT_TARGET) {
          onScrollEnd(div.scrollLeft);
        }
      },
      options,
    );
  } else {
    let id: ReturnType<typeof setTimeout> | undefined;
    div.addEventListener(
      'scroll',
      event => {
        if (event.eventPhase !== Event.AT_TARGET) {
          return;
        }
        clearTimeout(id);
        const target = event.target as HTMLDivElement;
        const index = getVisibleIndex(target.scrollLeft, target.offsetWidth);
        const isExactlyAtSnappingPoint = Number.isInteger(index);
        if (isExactlyAtSnappingPoint) {
          onScrollEnd(target.scrollLeft);
        } else {
          id = setTimeout(() => {
            onScrollEnd(target.scrollLeft);
          }, DEBOUNCE_PERIOD_MS);
        }
      },
      options,
    );
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(id);
      },
      {
        once: true,
      },
    );
  }
}

const DEBOUNCE_PERIOD_MS = 150;
