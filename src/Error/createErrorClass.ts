export interface BaseErrorConstructor {
  new (...args: ConstructorParameters<ErrorConstructor>): Error;
}

export default function createErrorClass(
  name: string,
  options?: {
    message?: string;
    base?: ErrorConstructor;
  },
): BaseErrorConstructor {
  const BaseError = options?.base ?? Error;
  return {
    [name]: class extends BaseError {
      constructor(...args: ConstructorParameters<ErrorConstructor>) {
        const [_message = options?.message, ...rest] = args;
        super(_message, ...rest);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
      }
    },
  }[name];
}
