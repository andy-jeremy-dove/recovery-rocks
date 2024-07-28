import AnnouncementText from '../../components/AnnouncementText';
import {Sex} from '../../Profile';

export type AppealProps = {
  name: string;
  sex: Sex;
};

export default function Appeal(props: AppealProps) {
  const {name, sex} = props;
  return (
    <AnnouncementText>
      {name || (sex === Sex.Male ? 'Друг' : 'Подруга')}, ты{' '}
      {sex === Sex.Male ? 'чист' : 'чиста'}
    </AnnouncementText>
  );
}
