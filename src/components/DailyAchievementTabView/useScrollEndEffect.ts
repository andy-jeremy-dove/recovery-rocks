import type {RefObject} from 'react';
import type {ScrollView} from 'react-native';

export type UseScrollEndEffect = (
  scrollRef: RefObject<ScrollView>,
  onScrollEnd: (offsetX: number) => void,
) => void;

const useScrollEndEffect: UseScrollEndEffect = function useScrollEndEffect() {};

export default useScrollEndEffect;
