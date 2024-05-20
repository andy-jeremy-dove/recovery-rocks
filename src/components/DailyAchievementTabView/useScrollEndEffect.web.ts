import {autorun} from 'mobx';
import {useEffect} from 'react';

import getVisibleIndex from './getVisibleIndex';
import type _useScrollEndEffect from './useScrollEndEffect';

export default function useScrollEndEffect(
  ...[scrollRef, onScrollEnd]: Parameters<typeof _useScrollEndEffect>
): ReturnType<typeof _useScrollEndEffect> {
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
        listen(scroll.getScrollableNode(), onScrollEnd, controller.signal);
      }),
    );
    stack.defer(() => controller?.abort());
    return () => stack.dispose();
  }, [onScrollEnd, scrollRef]);
}

function listen(
  div: HTMLDivElement,
  onScrollEnd: Parameters<typeof _useScrollEndEffect>[1],
  signal: AbortSignal,
) {
  const options = {passive: true, capture: false, signal};
  const isSupported = ('onscrollend' in div) as boolean;
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
    signal.addEventListener('abort', () => clearTimeout(id), {
      once: true,
    });
  }
}

const DEBOUNCE_PERIOD_MS = 150;
