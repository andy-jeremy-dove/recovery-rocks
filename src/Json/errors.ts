import {createErrorClass} from '../Error';

export const JsonParseError = createErrorClass('JsonParseError', {
  message: 'Corrupt JSON',
});

export const JsonStringifyError = createErrorClass('JsonStringifyError', {
  message: 'Cannot stringify',
});
