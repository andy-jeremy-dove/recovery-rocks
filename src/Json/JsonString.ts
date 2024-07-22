import type {Opaque} from '../Opaque';
import type {Json} from './Json';

export type JsonString<T extends Json = Json> = Opaque<string, T, JsonTag>;

declare const JSON_TAG: unique symbol;
export type JsonTag = typeof JSON_TAG;
