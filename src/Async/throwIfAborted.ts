import {AbortedAbortSignal, NeverAbortSignal} from './DeterminedAbortSignal';
import {AbortError} from './errors';

function throwIfAborted(signal: AbortedAbortSignal): never;
function throwIfAborted(signal: NeverAbortSignal): void;
function throwIfAborted(signal?: AbortSignal): void | never;
function throwIfAborted(): void;
function throwIfAborted(signal?: AbortSignal): void | never {
  signal?.throwIfAborted?.();
  if (signal?.aborted) {
    throw signal.reason ?? new AbortError();
  }
}

export default throwIfAborted;
