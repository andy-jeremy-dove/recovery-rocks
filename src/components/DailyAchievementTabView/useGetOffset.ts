import type {RefObject} from 'react';
import {useCallback, useRef} from 'react';
import type {ScrollView} from 'react-native';

export type UseGetOffset = (
  scrollRef: RefObject<ScrollView>,
) => [getOffset: () => number | undefined, setOffset?: (_: number) => void];

const useGetOffset: UseGetOffset = function useGetOffset() {
  const offsetRef = useRef<number>();
  const getOffset = useCallback(() => offsetRef.current, []);
  const setOffset = useCallback((_: number) => {
    offsetRef.current = _;
  }, []);
  return [getOffset, setOffset];
};

export default useGetOffset;
