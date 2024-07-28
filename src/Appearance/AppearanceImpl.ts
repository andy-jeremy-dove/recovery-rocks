import {Appearance as RNAppearance} from 'react-native';
import type {ColorSchemeName} from 'react-native/Libraries/Utilities/Appearance';

import {
  type Bus,
  BusImpl,
  type Observable,
  ObservableIdentityImpl,
} from '../structure';
import {type Appearance, ColorScheme} from './Appearance';

export default class AppearanceImpl implements Appearance {
  public readonly colorScheme = new AppearanceColorSchemeObservableImpl();
}

class AppearanceColorSchemeObservableImpl
  extends ObservableIdentityImpl
  implements Observable<ColorScheme | undefined>
{
  private _stack: DisposableStack | undefined;

  public constructor() {
    super();
  }

  private readonly _updates = BusImpl.lazy<
    (_: ColorScheme | undefined) => unknown
  >(send => {
    const that = this;
    return {
      onBeforeAnyListener() {
        that._stack?.dispose();
        using stack = new DisposableStack();
        const changeSub = RNAppearance.addChangeListener(_ => {
          send(translateColorScheme(_.colorScheme));
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
  });

  get updates(): Bus<(_: ColorScheme) => unknown> {
    return this._updates;
  }

  peek(): ColorScheme | undefined {
    return translateColorScheme(RNAppearance.getColorScheme());
  }
}

function translateColorScheme(_: ColorSchemeName): ColorScheme | undefined {
  switch (_) {
    case 'light':
      return ColorScheme.Light;
    case 'dark':
      return ColorScheme.Dark;
    default:
      return undefined;
  }
}
