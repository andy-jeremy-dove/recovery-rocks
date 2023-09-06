import ComputedObservableImpl from './ComputedObservableImpl';
import {Observable} from './Observable';
import {ReactiveComputation} from './ReactiveComputation';

export default function computed<T>(
  executor: ReactiveComputation<T>,
): Observable<T> {
  return new ComputedObservableImpl(executor);
}
