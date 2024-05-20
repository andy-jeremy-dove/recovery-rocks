import {RefObject, useCallback, useRef} from 'react';
import {ScrollView} from 'react-native';

export default function useGetOffset(
  scrollRef: RefObject<ScrollView>,
): [getOffset: () => number | undefined, setOffset?: (_: number) => void] {
  const offsetRef = useRef<number>();
  const getOffset = useCallback(() => offsetRef.current, []);
  const setOffset = useCallback((_: number) => {
    offsetRef.current = _;
  }, []);
  return [getOffset, setOffset];
}
