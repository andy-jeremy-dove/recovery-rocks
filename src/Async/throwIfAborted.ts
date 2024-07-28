import type {
  AbortedAbortSignal,
  NeverAbortSignal,
} from './DeterminedAbortSignal';
import {AbortError} from './errors';

function throwIfAborted(signal: AbortedAbortSignal): never;
function throwIfAborted(
  signal: AbortSignal | NeverAbortSignal | undefined,
): void;
function throwIfAborted(signal?: AbortSignal): void | never {
  if (signal && 'throwIfAborted' in signal) {
    signal.throwIfAborted();
  }
  if (signal?.aborted) {
    throw signal.reason ?? new AbortError();
  }
}

export default throwIfAborted;
