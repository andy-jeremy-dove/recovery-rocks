export type RootStackParamList = {
  PromptSetup: undefined;
  ShowProgress: {tab?: ProgressTab} | undefined;
  PromptSettings: undefined;
};

export enum ProgressTab {
  Accumulative = 'yMd',
  Months = 'M',
  Days = 'd',
}
