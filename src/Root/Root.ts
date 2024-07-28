import type {CurrentTime} from '../CurrentTime';
import type {ProfileStorage} from '../ProfileStorage';
import type {Time} from '../Time';

export interface Root {
  readonly time: Time;
  readonly currentTime: CurrentTime;
  readonly profileStorage: ProfileStorage;
}
