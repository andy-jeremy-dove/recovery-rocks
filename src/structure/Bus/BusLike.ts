export interface BusLike<L extends BaseListener> {
  listen(listener: L): void;

  forget(listener: L): void;
}

export type BaseListener = (...args: never[]) => unknown;
