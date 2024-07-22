import type {Comparator} from './Comparator';
import strict from './strict';

export default function arrays<T = unknown>(
  a: T[],
  b: T[],
  areEqual: Comparator<T> = strict,
): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (!areEqual(a[i], b[i])) {
      return false;
    }
  }
  return true;
}
