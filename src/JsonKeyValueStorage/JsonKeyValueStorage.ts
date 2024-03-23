import {BaseAsyncOptions} from '../Async';
import {Json} from '../Json';

export interface ReadonlyJsonKeyValueStorage<
  KV extends AbstractJsonKeyValueMap = AbstractJsonKeyValueMap,
> {
  get<K extends keyof KV>(
    key: K,
    options?: BaseAsyncOptions,
  ): Promise<KV[K] | undefined>;

  has<K extends keyof KV>(key: K, options?: BaseAsyncOptions): Promise<boolean>;
}

export interface JsonKeyValueStorage<
  KV extends AbstractJsonKeyValueMap = AbstractJsonKeyValueMap,
> extends ReadonlyJsonKeyValueStorage<KV> {
  set<K extends keyof KV>(
    key: K,
    value: KV[K],
    options?: BaseAsyncOptions,
  ): Promise<void>;

  delete<K extends keyof KV>(key: K, options?: BaseAsyncOptions): Promise<void>;
}

export type AbstractJsonKeyValueMap = {[K in string]: Json};
