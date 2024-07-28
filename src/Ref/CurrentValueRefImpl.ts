import type {Observable} from '../structure';
import LatestValueRefImpl from './LatestValueRefImpl';
import type {Ref} from './Ref';

export default class CurrentValueRefImpl<T>
  extends LatestValueRefImpl<T, T>
  implements Ref<T, true>, Disposable
{
  constructor(observable: Observable<T>) {
    super(observable.updates, observable.peek());
  }
}
