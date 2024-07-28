import {observer} from 'mobx-react-lite';

import {useRoot} from '../../Root';
import Appeal from './Appeal';
import Greeting from './Greeting';

export type AnnouncementProps = {
  promptSetup: () => void;
};

export default observer(function Announcement(props: AnnouncementProps) {
  const {promptSetup} = props;
  const root = useRoot();
  const profile = root.profileStorage.current;
  if (profile) {
    return <Appeal name={profile.name} sex={profile.sex} />;
  }
  return <Greeting onPress={promptSetup} />;
});
