import type {_Object} from '../../Paramut';

export type MeetingCard<Mut extends boolean = false> = _Object<
  {
    id: string;
    title: string;
    backgroundColor: string;
    textColor: string;
    borderColor?: string;
  },
  Mut
>;
