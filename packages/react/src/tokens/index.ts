import { BorderRadius } from "./BorderRadius";
import { BorderWidth } from "./BorderWidth";
import { BoxShadow } from "./BoxShadow";
import { Colors, ColorsDark } from "./Colors";
import { FontFamily } from "./FontFamily";
import { FontSize } from "./FontSize";
import { LetterSpacing } from "./LetterSpacing";
import { LineHeight } from "./LineHeight";
import { Margins } from "./Margins";
import { MaxSize } from "./MaxSize";
import { Opacity } from "./Opacity";
import { OutlineWidth } from "./OutlineWidth";
import { Screens } from "./Screens";
import { Size } from "./Size";
import { Spacing } from "./Spacing";
import { ZIndex } from "./ZIndex";

export const tokens = {
  borderRadius: new BorderRadius(),
  borderWidth: new BorderWidth(),
  boxShadow: new BoxShadow(),
  colors: new Colors(),
  fontFamily: new FontFamily(),
  fontSize: new FontSize(),
  letterSpacing: new LetterSpacing(),
  lineHeight: new LineHeight(),
  margins: new Margins(),
  maxSize: new MaxSize(),
  opacity: new Opacity(),
  outlineWidth: new OutlineWidth(),
  screens: new Screens(),
  size: new Size(),
  spacing: new Spacing(),
  zIndex: new ZIndex(),
} as const;

export const tokensDark = {
  ...tokens,
  colors: new ColorsDark(),
} as const;
