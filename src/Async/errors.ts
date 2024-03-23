import {createErrorClass} from '../Error';

export const AbortError = createErrorClass('AbortError', {
  message: 'Operation aborted',
});

export const TimeoutError = createErrorClass('TimeoutError', {
  message: 'Timout exceeded',
  base: AbortError,
});

export const IgnoranceError = createErrorClass('IgnoranceError', {
  message: 'The operation result ignored',
  base: AbortError,
});

export const FinalizationError = createErrorClass('FinalizationError', {
  message: 'The operation finalized',
  base: AbortError,
});
