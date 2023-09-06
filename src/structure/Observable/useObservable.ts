import {useEffect, useState} from 'react';

import {Peeked} from './Observable';
import isObservable from './isObservable';
import peek from './peek';

function useObservable<T>(source: T): Peeked<T>;
function useObservable<T>(source?: T | undefined): Peeked<T> | undefined;
function useObservable<T>(source?: T | undefined): Peeked<T> | undefined {
  const [, setCurrent] = useState(() =>
    isObservable(source) ? source.peek() : source,
  );
  useEffect(() => {
    if (!isObservable(source)) {
      return;
    }
    const listener = (_: unknown) => setCurrent(_);
    source.updates.listen(listener);
    return () => source.updates.forget(listener);
  }, [source]);
  return peek(source);
}

export default useObservable;
