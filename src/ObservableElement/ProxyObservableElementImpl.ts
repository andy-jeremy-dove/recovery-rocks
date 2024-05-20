import {computed} from 'mobx';

import {ObservableElement} from './ObservableElement';
import ObservableElementImpl from './ObservableElementImpl';

export default class ProxyObservableElementImpl
  implements Partial<ObservableElement>
{
  constructor(private readonly _getElement: () => HTMLElement | undefined) {}

  private _previous?: ObservableElementImpl;
  @computed({keepAlive: true})
  private get _observableElement() {
    this._previous?.[Symbol.dispose]();
    const element = this._getElement();
    if (!element) {
      this._previous = undefined;
      return undefined;
    }
    const current = new ObservableElementImpl(element);
    this._previous = current;
    return current;
  }

  get scrollWidth() {
    return this._observableElement?.scrollWidth;
  }

  [Symbol.dispose]() {
    this._previous?.[Symbol.dispose]();
  }
}
