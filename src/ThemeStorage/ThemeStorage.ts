import type {ObservableAtomicValue} from '../ObservableAtomicValue';
import type {ThemeRecord} from '../ThemeRecord';

export interface ThemeStorage
  extends ObservableAtomicValue<ThemeRecord | undefined> {}
