import {Bus} from './Bus';
import {BaseListener, BusLike} from './BusLike';
import TranslatedBusImpl from './TranslatedBusImpl';
import {Comparator, arrays} from '../../Comparator';

/**
 * aka distinct until changed
 */
export default class UniqueBusImpl<L extends BaseListener>
  extends TranslatedBusImpl<L, L>
  implements Bus<L>
{
  private _latest: Parameters<L>;

  constructor(
    current: Parameters<L>,
    _source: BusLike<L>,
    _areEqual: Comparator<Parameters<L>> = arrays,
  ) {
    super(
      _source,
      listener =>
        ((...args: Parameters<L>) => {
          if (!_areEqual(this._latest, args)) {
            listener(...args);
          }
          this._latest = args;
        }) as L,
    );
    this._latest = current;
  }
}
