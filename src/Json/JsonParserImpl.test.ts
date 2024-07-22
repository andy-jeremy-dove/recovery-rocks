import {expect, it} from '@jest/globals';

import {JsonParseError} from './errors';
import type {JsonParser} from './JsonParser';
import JsonParserImpl from './JsonParserImpl';

it('parses arbitrary object', () => {
  const parser: JsonParser = new JsonParserImpl();
  expect(parser.parse('{"a": 1, "b": ["2"]}')).toMatchInlineSnapshot(`
{
  "a": 1,
  "b": [
    "2",
  ],
}
`);
});

it('fails to parse corrupt JSON', () => {
  const parser: JsonParser = new JsonParserImpl();
  expect(() => parser.parse('{a: 1, b: ["2"]}')).toThrowError(JsonParseError);
});
