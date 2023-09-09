import {Millisecond} from './units';
import {BusImpl, Observable, ObservableIdentityImpl} from '../structure';

export default class IntervalObservableImpl
  extends ObservableIdentityImpl
  implements Observable<Millisecond>
{
  public constructor(
    private readonly _coarsening = 1000 as Millisecond, // a second
  ) {
    super();
  }

  peek() {
    const now = Date.now() as Millisecond;
    return dropRemainder(now, this._coarsening);
  }

  readonly updates = BusImpl.lazy<(_: Millisecond) => any>(send => {
    const that = this;
    let id: ReturnType<typeof setInterval> | undefined;
    return {
      onBeforeAnyListener() {
        id = setInterval(() => send(that.peek()), that._coarsening);
      },
      onAfterCompletelyForgot() {
        clearInterval(id);
      },
    };
  });
}

function dropRemainder<T extends number>(divisible: T, divider: T): T {
  return (divisible - (divisible % divider)) as T;
}
