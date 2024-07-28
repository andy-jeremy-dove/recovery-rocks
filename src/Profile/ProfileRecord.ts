import type {DateRecord} from '../DateRecord';
import type {_Object} from '../Paramut';

export type ProfileRecord<Mut extends boolean = false> = _Object<
  {
    name: string;
    sex: Sex;
    start: DateRecord<Mut>;
  },
  Mut
>;

export enum Sex {
  Male,
  Female,
}
