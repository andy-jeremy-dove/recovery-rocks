import type {AbortedAbortSignal} from './DeterminedAbortSignal';

export default function createAbortedSignal(
  reason?: unknown,
): AbortedAbortSignal {
  if ('abort' in AbortSignal) {
    return AbortSignal.abort(reason) as AbortedAbortSignal;
  }
  const controller = new AbortController();
  controller.abort(reason);
  return controller.signal as AbortedAbortSignal;
}
