import {JsonStringifyError} from './errors';
import type {Json} from './Json';
import type {JsonString} from './JsonString';
import type {JsonStringifier, JsonStringifierOptions} from './JsonStringifier';

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
