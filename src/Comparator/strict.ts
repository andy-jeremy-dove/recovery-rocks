export default function strict<T>(a: T, b: T): boolean {
  return Object.is(a, b);
}
