import {now} from 'mobx-utils';

import type {Millisecond} from './units';

export default function interval(
  coarsening = 1000 as Millisecond, // a second
): () => Millisecond {
  return () => now(coarsening) as Millisecond;
}
