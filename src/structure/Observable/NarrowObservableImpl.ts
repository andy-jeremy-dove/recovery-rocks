import {Observable} from './Observable';
import TranslatedObservableImpl from './TranslatedObservableImpl';
import {Bus, UniqueBusImpl} from '../Bus';

export default class NarrowObservableImpl<S, T>
  extends TranslatedObservableImpl<S, T>
  implements Observable<T>
{
  public readonly updates: Bus<(_: T) => any>;

  constructor(
    protected readonly _source: Observable<S>,
    protected readonly _translate: (_: S) => T,
    private readonly _areEqual: (one: T, another: T) => boolean = (a, b) =>
      Object.is(a, b),
  ) {
    super(_source, _translate);
    this.updates = new UniqueBusImpl(
      [_translate(_source.peek())],
      // this.updates DO actually exist at this moment
      // TypeScript wrongly complains about its uninitialized state
      // this field was initialized at DerivedImpl right after super call
      this._getUpdates(),
      ([a], [b]) => _areEqual(a, b),
    );
  }

  /**
   * @see constructor
   * @private
   */
  private _getUpdates() {
    return this.updates;
  }
}