import {MutableRefObject, RefObject, useState} from 'react';

import RefObjectImpl from './RefObjectImpl';

function useObservableRef<T>(initialValue: T): MutableRefObject<T>;
function useObservableRef<T>(initialValue: T | null): RefObject<T>;
function useObservableRef<T = undefined>(): MutableRefObject<T | undefined>;
function useObservableRef<T>(
  initialValue?: T | null,
): MutableRefObject<T | undefined> {
  const [ref] = useState(() => new RefObjectImpl(initialValue));
  return ref as MutableRefObject<T | undefined>;
}

export default useObservableRef;
