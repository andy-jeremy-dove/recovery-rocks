import type {CurrentTime} from '../CurrentTime';
import type {MeetingCardStorage} from '../MeetingCardStorage';
import type {ProfileStorage} from '../ProfileStorage';
import type {ThemeState} from '../ThemeState/ThemeState';
import type {ThemeStorage} from '../ThemeStorage';
import type {Time} from '../Time';

export interface Root {
  readonly time: Time;
  readonly currentTime: CurrentTime;
  readonly profileStorage: ProfileStorage;
  readonly themeStorage: ThemeStorage;
  readonly themeState: ThemeState;
  readonly meetingCardStorage: MeetingCardStorage;
}
