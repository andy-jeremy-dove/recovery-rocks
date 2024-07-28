import type {MutableRefObject, RefObject} from 'react';
import {useState} from 'react';

import {RefImpl} from '../Ref';

function useObservableRef<T>(initialValue: T): MutableRefObject<T>;
function useObservableRef<T>(initialValue: T | null): RefObject<T>;
function useObservableRef<T = undefined>(): MutableRefObject<T | undefined>;
function useObservableRef<T>(
  initialValue?: T | null,
): MutableRefObject<T | undefined> {
  const [ref] = useState(() => new RefImpl(initialValue));
  return ref as MutableRefObject<T | undefined>;
}

export default useObservableRef;
