import anySignal from './anySignal';
import {FinalizationError} from './errors';

export default async function performWithAnySignal<T>(
  op: (signal?: AbortSignal) => Promise<T>,
  _signals: Iterable<AbortSignal | undefined>,
): Promise<T> {
  const signals = [...compact(_signals)];
  if (signals.length <= 1) {
    const single = signals[0];
    return op(single);
  }
  const controller = new AbortController();
  const final = controller.signal;
  signals.push(final);
  try {
    const composition = anySignal(signals);
    return await op(composition);
  } finally {
    // this abortion performs a cleanup for the anySignal function
    controller.abort(new FinalizationError());
  }
}

function* compact<T>(source: Iterable<T | undefined>): IterableIterator<T> {
  for (const element of source) {
    if (element !== undefined) {
      yield element;
    }
  }
}
