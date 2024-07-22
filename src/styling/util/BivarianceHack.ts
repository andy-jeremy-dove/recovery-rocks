export type BivarianceHack<
  T extends (this: never, ...args: never[]) => unknown,
> = {
  hack(this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T>;
}['hack'];
