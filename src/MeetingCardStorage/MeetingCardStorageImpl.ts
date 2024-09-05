import type {_Array} from '../Paramut';
import type {MeetingCard, MeetingCardId} from '../RecoveryRocks/TheWholeDump';
import {cards, cardsById} from './constant';
import type {MeetingCardStorage} from './MeetingCardStorage';

export default class MeetingCardStorageImpl implements MeetingCardStorage {
  getCards(): Promise<_Array<MeetingCard>> {
    return Promise.resolve(cards);
  }

  getCard(id: MeetingCardId): Promise<MeetingCard> {
    const card = cardsById.get(id);
    if (!card) {
      return Promise.reject(new Error('Not found'));
    }
    return Promise.resolve(card);
  }
}
