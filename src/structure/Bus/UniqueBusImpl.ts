import {Bus} from './Bus';
import {BaseListener, BusLike} from './BusLike';
import TranslatedBusImpl from './TranslatedBusImpl';

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
    protected readonly _source: BusLike<L>,
    private readonly _areEqual: (
      one: Parameters<L>,
      another: Parameters<L>,
    ) => boolean = shallowCompare,
  ) {
    super(
      _source,
      listener =>
        ((...args: Parameters<L>) => {
          if (!this._areEqual(this._latest, args)) {
            listener(...args);
          }
          this._latest = args;
        }) as L,
    );
    this._latest = current;
  }
}

function shallowCompare(a: unknown[], b: unknown[]) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) {
      return false;
    }
  }
  return true;
}
