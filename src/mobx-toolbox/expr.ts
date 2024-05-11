import {_isComputingDerivation, computed} from 'mobx';

export default function expr<T>(_: () => T): T {
  return _isComputingDerivation() ? computed(_).get() : _();
}
