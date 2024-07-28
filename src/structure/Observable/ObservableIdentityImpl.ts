import type {Bus} from '../Bus';
import type {Observable, ObservableMetadata} from './Observable';
import {OBSERVABLE} from './Observable';

export default abstract class ObservableIdentityImpl
  implements Observable<unknown>
{
  protected constructor() {}

  [OBSERVABLE]: ObservableMetadata = {isObservable: true};

  abstract peek(): unknown;

  abstract get updates(): Bus<(_: unknown) => unknown>;
}
