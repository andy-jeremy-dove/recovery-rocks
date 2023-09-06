if (!Reflect.get(Symbol, 'dispose')) {
  Reflect.set(Symbol, 'dispose', Symbol('DISPOSE'));
}

if (!Reflect.get(Symbol, 'asyncDispose')) {
  Reflect.set(Symbol, 'asyncDispose', Symbol('ASYNC_DISPOSE'));
}
