import type {Bus, Observable} from '../structure';

export interface AppVisibility {
  readonly status: Observable<AppVisibilityStatus>;
  readonly isFocused: Bus<(_: boolean) => unknown>;
}

export enum AppVisibilityStatus {
  Active,
  Background,
  Inactive,
  Extension,
  Unknown,
}
