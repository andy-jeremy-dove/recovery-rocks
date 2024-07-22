import {expect, it} from '@jest/globals';

import {JsonStringifyError} from './errors';
import type {JsonStringifier} from './JsonStringifier';
import JsonStringifierImpl from './JsonStringifierImpl';

it('stringifies arbitrary object', () => {
  const stringifier: JsonStringifier = new JsonStringifierImpl();
  expect(
    stringifier.stringify({
      a: 1,
      b: ['2'],
    }),
  ).toMatchInlineSnapshot(`"{"a":1,"b":["2"]}"`);
});

it('fails to stringify object with circular reference', () => {
  const stringifier: JsonStringifier = new JsonStringifierImpl();

  expect(() =>
    stringifier.stringify(createObjectWithCircularReference()),
  ).toThrowError(JsonStringifyError);
});

type Circular = {
  circular: Circular;
};

function createObjectWithCircularReference(): Circular {
  const initial: Partial<Circular> = {};
  initial.circular = initial as Circular;
  return initial as Circular;
}
