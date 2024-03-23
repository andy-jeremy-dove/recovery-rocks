import {Json} from './Json';
import {Opaque} from '../Opaque';

export type JsonString<T extends Json = Json> = Opaque<string, T, JsonTag>;

declare const JSON_TAG: unique symbol;
export type JsonTag = typeof JSON_TAG;
