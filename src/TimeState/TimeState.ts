import type {Millisecond} from '../Time';

export interface TimeState {
  getNow(interval: Millisecond): Millisecond;
}
