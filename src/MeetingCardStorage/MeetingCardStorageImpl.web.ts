import type {BaseAsyncOptions} from '../Async';
import type {_Array, _Map} from '../Paramut';
import type {MeetingCard, MeetingCardId} from '../RecoveryRocks/TheWholeDump';
import type {MeetingCardStorage} from './MeetingCardStorage';

export default class MeetingCardStorageImpl implements MeetingCardStorage {
  private _cardsById?: _Map<MeetingCardId, MeetingCard>;

  private async _getCardsById(
    options?: BaseAsyncOptions,
  ): Promise<_Map<MeetingCardId, MeetingCard>> {
    if (this._cardsById) {
      return this._cardsById;
    }
    const response = await fetch(`/cards.json`, {signal: options?.signal});
    const cards = (await response.json()) as _Array<MeetingCard>;
    const byId = new Map(cards.map(_ => [_.id, _]));
    this._cardsById = byId;
    return byId;
  }

  async getCards(options?: BaseAsyncOptions): Promise<_Array<MeetingCard>> {
    const byId = await this._getCardsById(options);
    return [...byId.values()];
  }

  async getCard(
    id: MeetingCardId,
    options?: BaseAsyncOptions,
  ): Promise<MeetingCard> {
    const byId = await this._getCardsById(options);
    const card = byId.get(id);
    if (!card) {
      return Promise.reject(new Error('Not found'));
    }
    return Promise.resolve(card);
  }
}
