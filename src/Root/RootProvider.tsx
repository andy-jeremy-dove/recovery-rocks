import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';

import RootContext from './RootContext';
import RootImpl from './RootImpl';

export type RootProviderProps = {
  children?: ReactNode;
};

export default function RootProvider(props: RootProviderProps) {
  const [root] = useState(() => new RootImpl());
  useEffect(
    () => () => {
      root[Symbol.dispose]();
    },
    [root],
  );
  return <RootContext.Provider value={root} {...props} />;
}
