import type {Expect, ExpectExtends} from '@type-challenges/utils';

import type {AbstractJsonKeyValueMap} from '../JsonKeyValueStorage';
import type {JsonKeyValueMap} from './JsonKeyValueMap';

export type cases = [
  Expect<ExpectExtends<AbstractJsonKeyValueMap, JsonKeyValueMap>>,
];
