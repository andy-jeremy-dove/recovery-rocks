import {Json} from './Json';
import {JsonParser} from './JsonParser';
import {JsonString} from './JsonString';
import {JsonParseError} from './errors';

export default class JsonParserImpl implements JsonParser {
  parse<T extends Json = Json>(source: JsonString<T>): T {
    try {
      return JSON.parse(source);
    } catch (cause) {
      throw new JsonParseError(undefined, {cause});
    }
  }
}
