export default function anySignal(...args: AbortSignal[]): AbortSignal {
  if (args.length === 0) {
    return NEVER_SIGNAL;
  }
  if (args.length === 1) {
    return args[0];
  }
  const controller = new AbortController();
  for (const signal of args) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }
  }
  for (const signal of args) {
    signal.addEventListener('abort', onAbort, {once: true});
  }
  function onAbort() {
    controller.abort(args.find(_ => _.aborted)!.reason);
    cleanup();
  }
  function cleanup() {
    for (const signal of args) {
      signal.removeEventListener('abort', onAbort);
    }
  }
  return controller.signal;
}

const NEVER_CONTROLLER = new AbortController();
const NEVER_SIGNAL = NEVER_CONTROLLER.signal;
