export interface Comparator<T> {
  (one: T, another: T): boolean;
}
