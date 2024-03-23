import {Json} from './Json';
import {JsonString} from './JsonString';

export interface JsonParser {
  parse<T extends Json = Json>(source: JsonString<T>): T;
  parse(source: string): Json;
}
