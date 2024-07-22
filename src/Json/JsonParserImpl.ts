import {JsonParseError} from './errors';
import type {Json} from './Json';
import type {JsonParser} from './JsonParser';
import type {JsonString} from './JsonString';

export default class JsonParserImpl implements JsonParser {
  parse<T extends Json = Json>(source: JsonString<T>): T {
    try {
      return JSON.parse(source) as Json as T;
    } catch (cause) {
      throw new JsonParseError(undefined, {cause});
    }
  }
}
