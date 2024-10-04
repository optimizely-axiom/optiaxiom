import { createMapValueFn, createSprinkles } from "@vanilla-extract/sprinkles";

import * as styles from "./properties.css";

export const sprinkles = createSprinkles(
  styles.unresponsiveProps ?? { conditions: {} },
  styles.responsiveProps ?? { conditions: {} },
);
export const mapResponsiveValue = createMapValueFn(
  styles.responsiveProps ?? { conditions: {} },
);

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
