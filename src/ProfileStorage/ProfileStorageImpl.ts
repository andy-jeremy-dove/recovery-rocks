import {KeyValueJsonAtomicStorageImpl} from '../JsonAtomicStorage';
import type {JsonKeyValueStorage} from '../JsonKeyValueStorage';
import {JsonCachedObservableAtomicValueImpl} from '../ObservableAtomicValue';
import type {ProfileRecord} from '../Profile';
import type {ProfileStorage} from './ProfileStorage';

export default class ProfileStorageImpl<K extends string>
  extends JsonCachedObservableAtomicValueImpl<ProfileRecord>
  implements ProfileStorage, Disposable
{
  constructor(
    root: {
      readonly jsonKeyValueStorage: JsonKeyValueStorage<{
        [P in K]: ProfileRecord;
      }>;
    },
    key: K,
  ) {
    const jsonAtomicStorage = new KeyValueJsonAtomicStorageImpl(root, key);
    super(jsonAtomicStorage);
  }
}
