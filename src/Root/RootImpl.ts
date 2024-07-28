import {AppVisibilityImpl} from '../AppVisibility';
import {AppVisibilityStateImpl} from '../AppVisibilityState';
import {CurrentTimeImpl} from '../CurrentTime';
import JsonParserImpl from '../Json/JsonParserImpl';
import JsonStringifierImpl from '../Json/JsonStringifierImpl';
import type {JsonKeyValueMap} from '../JsonKeyValueMap/JsonKeyValueMap';
import {JsonKeyValueStorageImpl} from '../JsonKeyValueStorage';
import KeyValueStorageImpl from '../KeyValueStorage/KeyValueStorageImpl';
import {ProfileStorageImpl} from '../ProfileStorage';
import {TimeImpl} from '../Time';
import {TimeStateImpl} from '../TimeState';
import type {Root} from './Root';

export default class RootImpl implements Root, Disposable {
  readonly time = new TimeImpl();
  readonly appVisibility = new AppVisibilityImpl();
  readonly appVisibilityState = new AppVisibilityStateImpl(this);
  readonly timeState = new TimeStateImpl(this);
  readonly currentTime = new CurrentTimeImpl(this);
  readonly jsonParser = new JsonParserImpl();
  readonly jsonStringifier = new JsonStringifierImpl();
  readonly keyValueStorage = new KeyValueStorageImpl();
  readonly jsonKeyValueStorage = new JsonKeyValueStorageImpl<JsonKeyValueMap>(
    this,
    this.keyValueStorage,
    {prefix: 'local'},
  );
  readonly profileStorage = new ProfileStorageImpl(this, 'profile');

  [Symbol.dispose]() {
    for (const prop in this) {
      if (!Object.prototype.hasOwnProperty.call(this, prop)) {
        continue;
      }
      const instance = this[prop];
      if (typeof instance === 'object' && instance !== null) {
        const dispose = Reflect.get(instance, Symbol.dispose, instance);
        if (typeof dispose === 'function') {
          dispose.call(instance);
        }
      }
    }
  }
}
