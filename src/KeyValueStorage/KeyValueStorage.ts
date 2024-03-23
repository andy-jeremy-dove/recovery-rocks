import {BaseAsyncOptions} from '../Async';

export interface ReadonlyKeyValueStorage<
  KV extends AbstractKeyValueMap = AbstractKeyValueMap,
> {
  get<K extends keyof KV>(
    key: K,
    options?: BaseAsyncOptions,
  ): Promise<KV[K] | undefined>;

  has<K extends keyof KV>(key: K, options?: BaseAsyncOptions): Promise<boolean>;
}

export interface KeyValueStorage<
  KV extends AbstractKeyValueMap = AbstractKeyValueMap,
> extends ReadonlyKeyValueStorage<KV> {
  set<K extends keyof KV>(
    key: K,
    value: KV[K],
    options?: BaseAsyncOptions,
  ): Promise<void>;

  delete<K extends keyof KV>(key: K, options?: BaseAsyncOptions): Promise<void>;
}

export type AbstractKeyValueMap = {[K in string]: string};
