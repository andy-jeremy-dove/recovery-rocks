import AsyncStorage from '@react-native-async-storage/async-storage';

import {AbstractKeyValueMap, KeyValueStorage} from './KeyValueStorage';
import {BaseAsyncOptions, throwIfAborted, ignorePromise} from '../Async';

export default class KeyValueStorageImpl<
  KV extends AbstractKeyValueMap = AbstractKeyValueMap,
> implements KeyValueStorage<KV>
{
  async get<K extends keyof KV>(
    key: K,
    options?: BaseAsyncOptions,
  ): Promise<KV[K] | undefined> {
    throwIfAborted(options?.signal);
    const value = await ignorePromise(
      AsyncStorage.getItem(String(key)),
      options?.signal,
    );
    return (value ?? undefined) as KV[K] | undefined;
  }

  async has<K extends keyof KV>(
    key: K,
    options?: BaseAsyncOptions,
  ): Promise<boolean> {
    throwIfAborted(options?.signal);
    const value = await ignorePromise(
      AsyncStorage.getItem(String(key)),
      options?.signal,
    );
    return value === null;
  }

  async set<K extends keyof KV>(
    key: K,
    value: KV[K],
    options?: BaseAsyncOptions,
  ): Promise<void> {
    throwIfAborted(options?.signal);
    const previous = await this.get(key, options);
    if (previous === value) {
      return;
    }
    await ignorePromise(
      AsyncStorage.setItem(String(key), value),
      options?.signal,
    );
  }

  async delete<K extends keyof KV>(
    key: K,
    options?: BaseAsyncOptions,
  ): Promise<void> {
    throwIfAborted(options?.signal);
    const previous = await this.get(key, options);
    if (previous === undefined) {
      return;
    }
    await ignorePromise(AsyncStorage.removeItem(String(key)), options?.signal);
  }
}
