import type {Month} from '../Date';
import type {_Object} from '../Paramut';
import type {NaturalRange} from '../util/Range';

export type DateRecord<Mut extends boolean = false> = _Object<
  {
    day: NaturalRange<31>;
    month: Month;
    year: number;
  },
  Mut
>;
