export interface DeferredCollection<Immutable, Mutable extends Immutable> {
  readonly deferred: Mutable;
  guard(op: (actual: Immutable) => void): void;
}
