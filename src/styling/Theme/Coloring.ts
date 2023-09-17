export interface Coloring {
  readonly isDark: boolean;
  readonly palette: Readonly<Palette>;
}

export type Palette = {
  [P in ColorKey]: string;
};

export type ColorKey =
  | 'background'
  | 'backgroundGradient'
  | 'backgroundSpecialGradient'
  | 'textPrimary'
  | 'textSecondary'
  | 'borderPrimary'
  | 'borderSecondary'
  | 'backgroundAccent'
  | 'backgroundSelection'
  | 'backgroundAverage'
  | 'textAccent'
  | 'textHighlight'
  | 'textShadowHighlight'
  | 'textBackground'
  | 'link'
  | 'textSpecter';
