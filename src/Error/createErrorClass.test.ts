import {expect, it} from '@jest/globals';

import createErrorClass from './createErrorClass';

it('creates an instance of custom error', () => {
  const instance = new CustomError();
  expect(instance).toBeInstanceOf(CustomError);
});

it('creates an instance of specified base error class', () => {
  const instance = new CustomError();
  expect(instance).toBeInstanceOf(CustomError);
  expect(instance).toBeInstanceOf(TypeError);
  expect(instance).toBeInstanceOf(Error);
});

it('creates an instance with provided message and cause', () => {
  const message = 'oops';
  const originalMessage = 'original oops';
  const cause = new Error(originalMessage);
  const instance = new CustomError(message, {cause});
  expect(instance.message).toBe(message);
  expect(instance.name).toBe(CUSTOM_ERROR_NAME);
  expect(instance.cause).toBe(cause);
  expect(instance).toMatchInlineSnapshot(`[CustomError: oops]`);
});

it('creates an instance that survives being cloned structurally', () => {
  const message = 'oops';
  const originalMessage = 'original oops';
  const cause = new RangeError(originalMessage);
  const instance = new CustomError(message, {cause});
  const cloned = structuredClone(instance);
  const clonedCause = cloned.cause as Error;
  expect(cloned.message).toBe(message);
  expect(cloned.name).toBe(Error.name);
  expect(cloned).toMatchInlineSnapshot(`[Error: oops]`);
  expect(clonedCause.message).toBe(originalMessage);
  expect(clonedCause.name).toBe(cause.name);
  expect(clonedCause).toMatchInlineSnapshot(`[RangeError: original oops]`);
});

const CUSTOM_ERROR_NAME = 'CustomError';
const CustomError = createErrorClass(CUSTOM_ERROR_NAME, {
  message: 'A custom error occurred',
  base: TypeError,
});
