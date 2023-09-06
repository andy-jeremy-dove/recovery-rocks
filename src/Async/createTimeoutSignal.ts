import {TimeoutError} from './errors';
import {Millisecond} from '../Time';

export default function createTimeoutSignal(timeout: Millisecond) {
  if ('timeout' in AbortSignal) {
    return (AbortSignal as any).timeout(timeout) as AbortSignal;
  }
  const controller = new AbortController();
  const id = setTimeout(onTimeout, timeout);
  function onTimeout() {
    controller.abort(createTimeoutError());
    controller.signal.removeEventListener('abort', onAbort);
  }
  controller.signal.addEventListener('abort', onAbort, {once: true});
  function onAbort() {
    clearTimeout(id);
  }
  return controller.signal;
}

function createTimeoutError(message = 'The operation timed out.') {
  if ('DOMException' in globalThis) {
    return new globalThis.DOMException(message, 'TimeoutError');
  }
  return new TimeoutError(message);
}
