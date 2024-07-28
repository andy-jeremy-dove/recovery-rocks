import type {AppStateStatus} from 'react-native';
import {AppState} from 'react-native';

import type {Bus, Observable} from '../structure';
import {BusImpl, ObservableIdentityImpl} from '../structure';
import type {AppVisibility} from './AppVisibility';
import {AppVisibilityStatus} from './AppVisibility';

export default class AppVisibilityImpl implements AppVisibility {
  private readonly _status = new AppVisibilityStatusObservableImpl();

  private _stack: DisposableStack | undefined;
  private readonly _isFocused = BusImpl.lazy<(_: boolean) => unknown>(send => {
    const that = this;
    return {
      onBeforeAnyListener() {
        that._stack?.dispose();
        using stack = new DisposableStack();
        const focusSub = AppState.addEventListener('focus', () => {
          send(true);
        });
        stack.defer(() => {
          focusSub.remove();
        });
        const blurSub = AppState.addEventListener('blur', () => {
          send(false);
        });
        stack.defer(() => {
          blurSub.remove();
        });
        that._stack = stack.move();
      },
      onAfterCompletelyForgot() {
        that._stack?.dispose();
      },
    };
  });

  get status(): Observable<AppVisibilityStatus> {
    return this._status;
  }

  get isFocused(): Bus<(_: boolean) => unknown> {
    return this._isFocused;
  }
}

class AppVisibilityStatusObservableImpl
  extends ObservableIdentityImpl
  implements Observable<AppVisibilityStatus>
{
  private _stack: DisposableStack | undefined;

  public constructor() {
    super();
  }

  private readonly _updates = BusImpl.lazy<(_: AppVisibilityStatus) => unknown>(
    send => {
      const that = this;
      return {
        onBeforeAnyListener() {
          that._stack?.dispose();
          using stack = new DisposableStack();
          const changeSub = AppState.addEventListener('change', _ => {
            send(translateStatus(_));
          });
          stack.defer(() => {
            changeSub.remove();
          });
          that._stack = stack.move();
        },
        onAfterCompletelyForgot() {
          that._stack?.dispose();
        },
      };
    },
  );

  get updates(): Bus<(_: AppVisibilityStatus) => unknown> {
    return this._updates;
  }

  peek(): AppVisibilityStatus {
    return translateStatus(AppState.currentState);
  }
}

function translateStatus(_: AppStateStatus): AppVisibilityStatus {
  switch (_) {
    case 'active':
      return AppVisibilityStatus.Active;
    case 'background':
      return AppVisibilityStatus.Background;
    case 'inactive':
      return AppVisibilityStatus.Inactive;
    case 'extension':
      return AppVisibilityStatus.Extension;
    default:
      return AppVisibilityStatus.Unknown;
  }
}
