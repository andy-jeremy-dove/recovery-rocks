import type {BaseAsyncOptions} from '../Async';

export interface AtomicStorage<T> {
  load(options?: BaseAsyncOptions): Promise<T | undefined>;

  save(
    __: T | undefined | ((_: T | undefined) => T | undefined),
    options?: BaseAsyncOptions,
  ): Promise<void>;
}
