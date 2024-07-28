import type {BaseAsyncOptions} from '../Async';
import type {Json} from '../Json';
import type {JsonKeyValueStorage} from '../JsonKeyValueStorage';
import type {JsonAtomicStorage} from './JsonAtomicStorage';

export default class KeyValueJsonAtomicStorageImpl<
  K extends string,
  T extends Json,
> implements JsonAtomicStorage<T>
{
  constructor(
    private readonly _root: {
      readonly jsonKeyValueStorage: JsonKeyValueStorage<{[P in K]: T}>;
    },
    private readonly _key: K,
  ) {}

  load(options?: BaseAsyncOptions) {
    return this._root.jsonKeyValueStorage.get(this._key, options);
  }

  async save(
    valueOrFactory: T | undefined | ((_: T | undefined) => T | undefined),
    options?: BaseAsyncOptions,
  ) {
    const value =
      typeof valueOrFactory === 'function'
        ? valueOrFactory(await this.load(options))
        : valueOrFactory;
    if (value === undefined) {
      return this._root.jsonKeyValueStorage.delete(this._key, options);
    }
    return this._root.jsonKeyValueStorage.set(this._key, value, options);
  }
}
