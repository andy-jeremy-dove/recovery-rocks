import type {MeetingCardId} from '../RecoveryRocks/TheWholeDump';

export type RootStackParamList = {
  PromptSetup: undefined;
  ShowProgress: {tab?: ProgressTab} | undefined;
  PromptSettings: undefined;
  ShowTopic: undefined;
  ShowMeetingCard: {id: MeetingCardId};
};

export enum ProgressTab {
  Accumulative = 'yMd',
  Months = 'M',
  Days = 'd',
}
