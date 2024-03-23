import {
  AbstractJsonKeyValueMap,
  JsonKeyValueStorage,
} from './JsonKeyValueStorage';
import {BaseAsyncOptions, throwIfAborted} from '../Async';
import {JsonParser, JsonStringifier} from '../Json';
import {KeyValueStorage} from '../KeyValueStorage';
import {Default, fallbackIfNullish} from '../Opaque';

export default class JsonKeyValueStorageImpl<
  KV extends AbstractJsonKeyValueMap = AbstractJsonKeyValueMap,
> implements JsonKeyValueStorage<KV>
{
  constructor(
    private readonly _root: {
      readonly jsonParser: JsonParser;
      readonly jsonStringifier: JsonStringifier;
    },
    private readonly _storage: KeyValueStorage,
    private readonly _options?: JsonKeyValueStorageImplOptions,
  ) {}

  async get<K extends keyof KV>(
    _key: K,
    options?: BaseAsyncOptions,
  ): Promise<KV[K] | undefined> {
    throwIfAborted(options?.signal);

    const prefix = fallbackIfNullish(this._options?.prefix, EMPTY_PREFIX);
    const key = `${prefix}${String(_key)}`;

    const value = await this._storage.get(key, options);
    if (value === undefined) {
      return value;
    }
    return this._root.jsonParser.parse(value) as KV[K];
  }

  has<K extends keyof KV>(
    _key: K,
    options?: BaseAsyncOptions,
  ): Promise<boolean> {
    throwIfAborted(options?.signal);

    const prefix = fallbackIfNullish(this._options?.prefix, EMPTY_PREFIX);
    const key = `${prefix}${String(_key)}`;

    return this._storage.has(key, options);
  }

  async set<K extends keyof KV>(
    _key: K,
    value: KV[K],
    options?: BaseAsyncOptions,
  ): Promise<void> {
    throwIfAborted(options?.signal);

    const prefix = fallbackIfNullish(this._options?.prefix, EMPTY_PREFIX);
    const key = `${prefix}${String(_key)}`;

    const raw = this._root.jsonStringifier.stringify(value);
    return this._storage.set(key, raw, options);
  }

  async delete<K extends keyof KV>(
    _key: K,
    options?: BaseAsyncOptions,
  ): Promise<void> {
    throwIfAborted(options?.signal);

    const prefix = fallbackIfNullish(this._options?.prefix, EMPTY_PREFIX);
    const key = `${prefix}${String(_key)}`;

    return this._storage.delete(key, options);
  }
}

export type JsonKeyValueStorageImplOptions = {
  prefix?: Default<string, typeof EMPTY_PREFIX>;
};

const EMPTY_PREFIX = '';
