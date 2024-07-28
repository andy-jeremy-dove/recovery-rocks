import type {
  Equal,
  ExpectExtends,
  ExpectFalse,
  ExpectTrue,
  IsFalse,
  IsTrue,
} from '@type-challenges/utils';

import type {NaturalRange} from '../util/Range';
import type {DateTag} from './DateTag';

export type cases = [
  IsTrue<ExpectExtends<DateTag, '1/0'>>, // 1th of January
  IsTrue<ExpectExtends<DateTag, '29/1'>>, // 29th of February
  IsFalse<ExpectExtends<DateTag, '31/1'>>,
  ExpectTrue<Equal<NaturalRange<5>, 1 | 2 | 3 | 4 | 5>>,
  ExpectFalse<Equal<NaturalRange<5>, number>>,
  IsFalse<ExpectExtends<NaturalRange<5>, number>>,
];
