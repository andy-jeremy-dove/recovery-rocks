import {useHeaderHeight} from '@react-navigation/elements';
import type {StackScreenProps} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';

import type {RootStackParamList} from '../../RootStack/RootStackParamList';
import ShowMeetingCardScreen from '../../screens/ShowMeetingCardScreen';
import {useTheme} from '../../styling';
import useCard from './useCard';

export type ShowMeetingCardBindingProps = StackScreenProps<
  RootStackParamList,
  'ShowMeetingCard'
>;

export default observer(function ShowMeetingCardBinding(
  props: ShowMeetingCardBindingProps,
) {
  const {route} = props;
  const {id} = route.params;
  const card = useCard(id);
  const theme = useTheme();
  const headerHeight = useHeaderHeight();
  return (
    <ShowMeetingCardScreen
      title={
        card === null ? 'Не найдено' : card === undefined ? '' : card.title
      }
      body={
        card === null
          ? `Не удалось найти карточку с идентификатором ${id}`
          : card === undefined
            ? ''
            : card.body
      }
      backgroundColor={card?.backgroundColor ?? theme.palette.background}
      textColor={card?.textColor ?? theme.palette.textPrimary}
      borderColor={card?.borderColor ?? theme.palette.textPrimary}
      compensateHeaderHeight={headerHeight}
    />
  );
});
