import {
  createMapValueFn,
  createNormalizeValueFn,
  createSprinkles,
} from "@vanilla-extract/sprinkles";

import * as styles from "./properties.css";

export const vars = {
  fontFamilyVar: styles.fontFamilyVar,
};

export const sprinkles = createSprinkles(
  styles.unresponsiveProps,
  styles.responsiveProps,
);
export const mapResponsiveValue = createMapValueFn(styles.responsiveProps);
export const normalizeResponsiveValue = createNormalizeValueFn(
  styles.responsiveProps,
);

export type LonghandProps = keyof Pick<
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
export type Sprinkles = Omit<Parameters<typeof sprinkles>[0], LonghandProps>;
