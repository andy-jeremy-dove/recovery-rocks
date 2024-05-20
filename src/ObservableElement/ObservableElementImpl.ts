import {action, observable, onBecomeObserved, onBecomeUnobserved} from 'mobx';

import {ObservableElement} from './ObservableElement';

export default class ObservableElementImpl implements ObservableElement {
  @observable.ref private accessor _scrollWidth: number;
  private readonly _stack?: DisposableStack;

  constructor(element: HTMLElement) {
    this._scrollWidth = element.scrollWidth;

    if ('ResizeObserver' in window) {
      using stack = new DisposableStack();
      const resizeObserver = new ResizeObserver(
        action(() => {
          this._scrollWidth = element.scrollWidth;
        }),
      );
      stack.defer(
        onBecomeObserved(this, '_scrollWidth', () =>
          resizeObserver.observe(element),
        ),
      );
      stack.defer(
        onBecomeUnobserved(this, '_scrollWidth', () =>
          resizeObserver.unobserve(element),
        ),
      );
      stack.defer(() => resizeObserver.disconnect());
      this._stack = stack.move();
    }
  }

  get scrollWidth() {
    return this._scrollWidth;
  }

  [Symbol.dispose]() {
    return this._stack?.dispose();
  }
}
