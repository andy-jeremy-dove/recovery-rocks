import {NeverAbortSignal} from './DeterminedAbortSignal';

export default function createNeverSignal(): NeverAbortSignal {
  const controller = new AbortController();
  return controller.signal as NeverAbortSignal;
}
