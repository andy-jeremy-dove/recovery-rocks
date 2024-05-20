import {observable, runInAction} from 'mobx';
import {RefObject, useCallback, useState} from 'react';
import {ScrollView} from 'react-native';

export default function useGetContentWidth(
  scrollRef: RefObject<ScrollView>,
): [
  getContentWidth: () => number | undefined,
  onContentSizeChange?: (width: number) => void,
] {
  const [contentWidth] = useState(() => observable.box<number>());
  const getContentWidth = useCallback(() => contentWidth.get(), [contentWidth]);
  const onContentSizeChange = useCallback(
    (width: number) => runInAction(() => contentWidth.set(width)),
    [contentWidth],
  );
  return [getContentWidth, onContentSizeChange];
}
