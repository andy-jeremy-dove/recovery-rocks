export default function createDictionary<T extends object>(
  _: T,
): {-readonly [P in keyof T]: T[P]} {
  const base = Object.create(null) as object;
  for (const ownKey of Reflect.ownKeys(_)) {
    const value = Reflect.get(_, ownKey);
    Reflect.set(base, ownKey, value);
  }
  return base as {[P in keyof T]: T[P]};
}
