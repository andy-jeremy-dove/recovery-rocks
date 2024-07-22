import createNeverSignal from './createNeverSignal';

export default function anySignal(
  _signals: Iterable<AbortSignal>,
): AbortSignal {
  const signals = [..._signals];
  if (signals.length === 0) {
    return createNeverSignal();
  }
  if (signals.length === 1) {
    return signals[0];
  }
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }
  }
  for (const signal of signals) {
    signal.addEventListener('abort', onAbort, {once: true});
  }

  function onAbort() {
    controller.abort(signals.find(_ => _.aborted)?.reason);
    cleanup();
  }

  function cleanup() {
    for (const signal of signals) {
      signal.removeEventListener('abort', onAbort);
    }
  }

  return controller.signal;
}
