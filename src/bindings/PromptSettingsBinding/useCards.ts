import {useEffect, useState} from 'react';

import type {_Array} from '../../Paramut';
import type {MeetingCard} from '../../RecoveryRocks/TheWholeDump';
import {useRoot} from '../../Root';

export default function useCards(): _Array<MeetingCard> | null | undefined {
  const {meetingCardStorage} = useRoot();
  const [result, setResult] = useState<
    _Array<MeetingCard> | null | undefined
  >();
  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const cards = await meetingCardStorage.getCards({
          signal: controller.signal,
        });
        setResult(cards);
      } catch {
        setResult(null);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [meetingCardStorage]);
  return result;
}
