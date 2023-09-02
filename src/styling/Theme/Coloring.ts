export interface Coloring {
  readonly isDark: boolean;
  readonly palette: Readonly<Palette>;
}

export type Palette = {
  [P in ColorKey]: string;
};

export type ColorKey =
  | "background"
  | "textPrimary"
  | "textSecondary"
  | "borderPrimary"
  | "borderSecondary"
  | "backgroundAccent"
  | "backgroundSelection"
  | "textAccent"
  | "textHighlight"
  | "textBackground"
  | "link"
  | "textSpecter";
