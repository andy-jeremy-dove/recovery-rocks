import type {Context} from 'react';
import {useContext} from 'react';

export default function useForcedContext<T>(
  context: Context<T | undefined>,
): T | never {
  const value = useContext(context);
  if (value === undefined) {
    throw new TypeError(
      `No context provided for ${context.displayName ?? 'Unknown'}`,
    );
  }
  return value;
}
