import {Json} from './Json';
import {JsonString} from './JsonString';
import {JsonStringifier, JsonStringifierOptions} from './JsonStringifier';
import {JsonStringifyError} from './errors';

export default class JsonStringifierImpl implements JsonStringifier {
  stringify<T extends Json = Json>(
    source: T,
    options?: JsonStringifierOptions,
  ): JsonString<T> {
    try {
      return JSON.stringify(source, undefined, options?.space) as JsonString<T>;
    } catch (cause) {
      throw new JsonStringifyError(undefined, {cause});
    }
  }
}
