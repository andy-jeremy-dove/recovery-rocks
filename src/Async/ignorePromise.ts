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
    new Promise<never>((_resolve, reject) => {
      function onAbort() {
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        reject(signal?.reason ?? new IgnoranceError());
      }
      signal.addEventListener('abort', onAbort, {once: true});
      void target.finally(() => {
        signal.removeEventListener('abort', onAbort);
      });
    }),
  ]);
}
