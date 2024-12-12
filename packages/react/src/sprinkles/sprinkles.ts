import { createMapValueFn, createSprinkles } from "@vanilla-extract/sprinkles";

import * as styles from "./properties.css";

export const sprinkles = createSprinkles(
  styles.unresponsiveProps,
  styles.responsiveProps,
);
export const mapResponsiveValue = createMapValueFn(styles.responsiveProps);

export type Sprinkles = Omit<Parameters<typeof sprinkles>[0], LonghandProps>;
type LonghandProps = keyof Pick<
  Parameters<typeof sprinkles>[0],
  | "backgroundColor"
  | "borderBottomWidth"
  | "borderLeftWidth"
  | "borderRadius"
  | "borderRightWidth"
  | "borderTopWidth"
  | "boxShadow"
  | "height"
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
