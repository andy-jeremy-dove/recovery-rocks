import {Pressable} from 'react-native';

import AnnouncementText from '../../components/AnnouncementText';
import LinkText from '../../components/LinkText';

export type GreetingProps = {
  onPress?: () => void;
};

export default function Greeting(props: GreetingProps) {
  const {onPress} = props;
  return (
    <Pressable onPress={onPress}>
      {({focused, hovered, pressed}) => (
        <AnnouncementText>
          Приветствуем, незнакомец!{'\n'}Как давно ты с нами?{'\n'}
          <LinkText hover={focused || hovered} active={pressed}>
            Установи начало отсчёта.
          </LinkText>
        </AnnouncementText>
      )}
    </Pressable>
  );
}
