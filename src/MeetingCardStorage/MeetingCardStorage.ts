import type {BaseAsyncOptions} from '../Async';
import type {_Array} from '../Paramut';
import type {MeetingCard, MeetingCardId} from '../RecoveryRocks/TheWholeDump';

export interface MeetingCardStorage {
  getCards(options?: BaseAsyncOptions): Promise<_Array<MeetingCard>>;

  getCard(id: MeetingCardId, options?: BaseAsyncOptions): Promise<MeetingCard>;
}
