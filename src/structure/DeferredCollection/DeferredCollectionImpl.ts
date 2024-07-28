import type {DeferredCollection} from './DeferredCollection';

export default class DeferredCollectionImpl<
  Immutable,
  Mutable extends Immutable,
> implements DeferredCollection<Immutable, Mutable>
{
  private _insideListener = false;
  private _deferred?: Mutable;

  constructor(
    private _actual: Mutable,
    private readonly _clone: (_: Mutable) => Mutable,
  ) {}

  get deferred() {
    if (this._insideListener) {
      this._deferred = this._deferred ?? this._clone(this._actual);
      return this._deferred;
    } else {
      return this._actual;
    }
  }

  private _applyDeferredChanges() {
    if (this._deferred) {
      this._actual = this._deferred;
      this._deferred = undefined;
    }
  }

  guard(op: (actual: Immutable) => void) {
    this._insideListener = true;
    try {
      op(this._actual);
    } finally {
      this._insideListener = false;
      this._applyDeferredChanges();
    }
  }
}
