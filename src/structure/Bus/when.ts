import {BaseListener, BusLike} from './BusLike';
import {AbortError} from '../../Async/errors';

export default async function when<L extends BaseListener>(
  bus: BusLike<L>,
  condition?: (...args: Parameters<L>) => boolean,
  signal?: AbortSignal,
): Promise<Parameters<L>> {
  if (signal?.aborted) {
    throw signal?.reason ?? new AbortError();
  }
  return new Promise((resolve, reject) => {
    function cleanUp() {
      bus.forget(listener);
      signal?.removeEventListener('abort', onAbort);
    }
    const listener = ((...args: Parameters<L>) => {
      if (condition === undefined || condition(...args)) {
        cleanUp();
        resolve(args);
      }
    }) as L;
    function onAbort() {
      cleanUp();
      reject(signal?.reason ?? new AbortError());
    }
    signal?.addEventListener('abort', onAbort, {once: true});
    bus.listen(listener);
  });
}
