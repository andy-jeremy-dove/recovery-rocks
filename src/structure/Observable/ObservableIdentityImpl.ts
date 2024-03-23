import {OBSERVABLE, Observable, ObservableMetadata} from './Observable';
import {Bus} from '../Bus';

export default abstract class ObservableIdentityImpl
  implements Observable<unknown>
{
  protected constructor() {}

  [OBSERVABLE]: ObservableMetadata = {isObservable: true};

  abstract peek(): unknown;

  abstract get updates(): Bus<(_: unknown) => unknown>;
}
