import type {AppVisibilityStatus} from '../AppVisibility';

export interface AppVisibilityState {
  readonly status: AppVisibilityStatus;
  readonly isFocused: boolean | undefined;
}
