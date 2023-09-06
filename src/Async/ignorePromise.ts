import {IgnoranceError} from './errors';

export default function ignorePromise<T>(
  target: Promise<T>,
  signal?: AbortSignal,
): Promise<T> {
  if (!signal) {
    return target;
  }
  return Promise.race<T>([
    target,
    new Promise(reject => {
      function onAbort() {
        reject(signal?.reason ?? new IgnoranceError());
      }
      signal?.addEventListener('abort', onAbort, {once: true});
      target.finally(() => {
        signal?.removeEventListener('abort', onAbort);
      });
    }),
  ]);
}
