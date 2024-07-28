import type {_Object} from '../Paramut';

export type Ref<T, Mut extends boolean = false> = _Object<
  {
    current: T;
  },
  Mut
>;
