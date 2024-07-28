import type {Equal, Expect} from '@type-challenges/utils';

import type {Observable, Peeked} from './Observable';

export type cases = [
  Expect<Equal<Peeked<Observable<number> | undefined>, number | undefined>>,
  Expect<
    Equal<Peeked<Observable<number> | number | undefined>, number | undefined>
  >,
  Expect<
    Equal<
      Peeked<Observable<number | undefined> | number | undefined>,
      number | undefined
    >
  >,
];
