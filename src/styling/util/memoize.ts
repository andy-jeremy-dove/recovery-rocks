import type {BivarianceHack} from './BivarianceHack';

export interface MemoCache<K extends object, V> {
  delete(key: K): boolean;

  get(key: K): V | undefined;

  has(key: K): boolean;

  set(key: K, value: V): this;
}

export default function memoize<
  T extends BivarianceHack<(_: object, ...rest: unknown[]) => unknown>,
>(
  target: T,
  _cache?: MemoCache<Parameters<T>[0], ReturnType<T>>,
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = _cache ?? new WeakMap();
  return function (arg, ...rest) {
    if (cache.has(arg)) {
      return cache.get(arg) as ReturnType<T>;
    } else {
      const result = target(arg, ...rest) as ReturnType<T>;
      cache.set(arg, result);
      return result;
    }
  };
}
