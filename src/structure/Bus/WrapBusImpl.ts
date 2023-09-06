import BaseBusImpl from './BaseBusImpl';
import {Bus} from './Bus';
import {BaseListener, BusLike} from './BusLike';

export default class WrapBusImpl<L extends BaseListener>
  extends BaseBusImpl<L>
  implements Bus<L>
{
  constructor(private readonly _source: BusLike<L>) {
    super();
  }

  protected _listenBase(listener: L) {
    this._source.listen(listener);
  }

  protected _forgetBase(listener: L) {
    this._source.forget(listener);
  }
}
