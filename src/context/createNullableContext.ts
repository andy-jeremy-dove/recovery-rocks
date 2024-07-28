import {createContext} from 'react';

export default function createNullableContext<T>() {
  return createContext<T | undefined>(undefined);
}
