import rawCards from '../../web/cards.json';
import type {_Array, _Map} from '../Paramut';
import type {MeetingCard, MeetingCardId} from '../RecoveryRocks/TheWholeDump';
import type {MeetingCardStorage} from './MeetingCardStorage';

export default class MeetingCardStorageImpl implements MeetingCardStorage {
  getCards() {
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

const cards = rawCards as unknown as _Array<MeetingCard>;

const cardsById = new Map(cards.map(_ => [_.id, _])) satisfies _Map<
  MeetingCardId,
  MeetingCard
>;
