import {AbortedAbortSignal} from './DeterminedAbortSignal';

export default function createAbortedSignal(
  reason?: unknown,
): AbortedAbortSignal {
  if (AbortSignal.abort) {
    return AbortSignal.abort(reason) as AbortedAbortSignal;
  }
  const controller = new AbortController();
  controller.abort(reason);
  return controller.signal as AbortedAbortSignal;
}
