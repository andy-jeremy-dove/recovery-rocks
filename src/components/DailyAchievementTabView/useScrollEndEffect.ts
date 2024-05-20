import type {RefObject} from 'react';
import type {ScrollView} from 'react-native';

export default function useScrollEndEffect(
  scrollRef: RefObject<ScrollView>,
  onScrollEnd: (offsetX: number) => void,
) {}
