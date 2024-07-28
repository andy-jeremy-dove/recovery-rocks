import type {AtomicStorage} from '../AtomicStorage';
import type {Json} from '../Json';

export interface JsonAtomicStorage<T extends Json> extends AtomicStorage<T> {}
