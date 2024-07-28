export interface ObservableAtomicValue<T> {
  /**
   * A MobX lazy observable with the current value
   */
  readonly current: T;

  set(_: T): void;

  set(__: (_: T) => T): void;
}
