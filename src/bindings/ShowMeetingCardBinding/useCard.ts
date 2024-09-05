import {useEffect, useState} from 'react';

import type {
  MeetingCard,
  MeetingCardId,
} from '../../RecoveryRocks/TheWholeDump';
import {useRoot} from '../../Root';

export default function useCard(
  id: MeetingCardId,
): MeetingCard | null | undefined {
  const {meetingCardStorage} = useRoot();
  const [result, setResult] = useState<MeetingCard | null | undefined>();
  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const card = await meetingCardStorage.getCard(id, {
          signal: controller.signal,
        });
        setResult(card);
      } catch {
        setResult(null);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [id, meetingCardStorage]);
  return result;
}
