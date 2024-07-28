import {KeyValueJsonAtomicStorageImpl} from '../JsonAtomicStorage';
import type {JsonKeyValueStorage} from '../JsonKeyValueStorage';
import {JsonCachedObservableAtomicValueImpl} from '../ObservableAtomicValue';
import {defaultThemeRecord, type ThemeRecord} from '../ThemeRecord';
import type {ThemeStorage} from './ThemeStorage';

export default class ProfileStorageImpl<K extends string>
  extends JsonCachedObservableAtomicValueImpl<ThemeRecord>
  implements ThemeStorage, Disposable
{
  constructor(
    root: {
      readonly jsonKeyValueStorage: JsonKeyValueStorage<{
        [P in K]: ThemeRecord;
      }>;
    },
    key: K,
  ) {
    const jsonAtomicStorage = new KeyValueJsonAtomicStorageImpl(root, key);
    super(jsonAtomicStorage, defaultThemeRecord);
  }
}
