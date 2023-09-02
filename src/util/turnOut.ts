export type ValidKey = string | number | symbol;
export type ObjectMap = { readonly [k: ValidKey]: ValidKey };
export type Swap<T extends ObjectMap> = {
  [K in keyof T as T[K]]: K;
};

export default function turnOut<T extends ObjectMap>(
  input: Readonly<T>,
): Swap<T> {
  const result = {} as Swap<T>;
  const keys = Reflect.ownKeys(input);
  for (const key of keys) {
    const value = Reflect.get(input, key);
    Reflect.set(result, value, key);
  }
  return result;
}
