export interface BaseErrorConstructor {
  new (...args: ConstructorParameters<ErrorConstructor>): Error;
}

export default function createErrorClass(
  name: string,
  options?: {
    message?: string;
    base?: BaseErrorConstructor;
  },
): BaseErrorConstructor {
  const BaseError = options?.base ?? Error;
  return {
    [name]: class extends BaseError {
      constructor(...args: ConstructorParameters<ErrorConstructor>) {
        const [_message = options?.message, ...rest] = args;
        super(_message, ...rest);
        if ('captureStackTrace' in Error) {
          // Available on v8 only
          Error.captureStackTrace(this, new.target);
        }
        this.name = name;
        // some compilers fail to extend built-in classes properly
        Object.setPrototypeOf(this, new.target.prototype);
      }
    },
  }[name];
}
