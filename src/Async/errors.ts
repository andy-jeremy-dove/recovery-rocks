import {createErrorClass} from '../Error';

export const AbortError = createErrorClass('AbortError', {
  message: 'Operation aborted',
});

export const TimeoutError = createErrorClass('TimeoutError', {
  message: 'Timout exceeded',
});

export const IgnoranceError = createErrorClass('IgnoranceError', {
  message: 'The operation result ignored',
});

export const FinalizationError = createErrorClass('FinalizationError', {
  message: 'The operation finalized',
});
