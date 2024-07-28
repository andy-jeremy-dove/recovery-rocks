import type {ObservableAtomicValue} from '../ObservableAtomicValue';
import type {ProfileRecord} from '../Profile';

export interface ProfileStorage
  extends ObservableAtomicValue<ProfileRecord | undefined> {}
