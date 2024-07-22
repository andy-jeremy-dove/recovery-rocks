import type {ExpectExtends, IsFalse, IsTrue} from '@type-challenges/utils';

import type {Json} from './Json';

export type cases = [
  IsTrue<ExpectExtends<Json, number>>,
  IsFalse<ExpectExtends<Json, undefined>>,
  IsTrue<ExpectExtends<Json, {field: undefined}>>,
  IsTrue<ExpectExtends<Json, {a: number; b: {a: string}}>>,
  IsTrue<ExpectExtends<Json, [1, ['a']]>>,
];
