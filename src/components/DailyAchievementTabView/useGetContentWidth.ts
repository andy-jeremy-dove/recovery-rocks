import {observable, runInAction} from 'mobx';
import type {RefObject} from 'react';
import {useCallback, useState} from 'react';
import type {ScrollView} from 'react-native';

export type UseGetContentWidth = (
  scrollRef: RefObject<ScrollView>,
) => [
  getContentWidth: () => number | undefined,
  onContentSizeChange?: (width: number) => void,
];

const useGetContentWidth: UseGetContentWidth = function useGetContentWidth() {
  const [contentWidth] = useState(() => observable.box<number>());
  const getContentWidth = useCallback(() => contentWidth.get(), [contentWidth]);
  const onContentSizeChange = useCallback(
    (width: number) => {
      runInAction(() => {
        contentWidth.set(width);
      });
    },
    [contentWidth],
  );
  return [getContentWidth, onContentSizeChange];
};

export default useGetContentWidth;
