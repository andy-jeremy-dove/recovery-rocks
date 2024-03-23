import {Json} from './Json';
import {JsonString} from './JsonString';

export interface JsonStringifier {
  stringify<T extends Json = Json>(
    source: T,
    options?: JsonStringifierOptions,
  ): JsonString<T>;
}

export type JsonStringifierOptions = {
  space?: string | number;
};
