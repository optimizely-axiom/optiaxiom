/**
 * Forked from https://vanilla-extract.style/documentation/packages/sprinkles/
 */

import { createMapValueFn } from "./createMapValueFn";
import { createSprinkles } from "./createSprinkles";
import { props } from "./sprinkles.css";

export const sprinkles = createSprinkles(...props);
export const mapResponsiveValue = createMapValueFn(props[0]);

type LonghandProps = keyof Pick<
  Parameters<typeof sprinkles>[0],
  | "backgroundColor"
  | "borderBottomLeftRadius"
  | "borderBottomRightRadius"
  | "borderBottomWidth"
  | "borderLeftWidth"
  | "borderRadius"
  | "borderRightWidth"
  | "borderTopLeftRadius"
  | "borderTopRightRadius"
  | "borderTopWidth"
  | "boxShadow"
  | "height"
  | "letterSpacing"
  | "lineHeight"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "maxHeight"
  | "maxWidth"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "width"
  | "zIndex"
>;
export type Sprinkles = Omit<Parameters<typeof sprinkles>[0], LonghandProps>;
