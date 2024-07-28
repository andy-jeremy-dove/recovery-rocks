import type {Dayjs} from 'dayjs';

import type {Millisecond} from '../Time';

export interface CurrentTime {
  readonly raw: Millisecond;
  readonly wrapped: Dayjs;
}
