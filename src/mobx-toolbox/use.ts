import type {OptionalGetter} from './OptionalGetter';

export default function use<T>(_: OptionalGetter<T>): T {
  if (typeof _ === 'function') {
    return (_ as () => T)();
  }
  return _;
}
