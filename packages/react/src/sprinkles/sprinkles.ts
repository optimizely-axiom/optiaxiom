// rolldown.config.mjs rewrites this exact import block to the runtime-only
// entry points; add other imports from this package on a separate line.
import {
  createMapValueFn,
  createNormalizeValueFn,
  createSprinkles,
} from "@vanilla-extract/sprinkles";

import * as styles from "./properties.css";
import {
  responsiveSpacingProps,
  responsiveSpacingVars,
} from "./responsiveSpacing";

export const vars = {
  fontFamilyVar: styles.fontFamilyVar,
};

const sprinklesClassName = createSprinkles(
  styles.unresponsiveProps,
  responsiveSpacingProps,
  styles.responsiveProps,
);

/**
 * Breakpoint values of padding and margin need the inline vars in `style`
 * alongside the classes.
 */
export const sprinkles = Object.assign(
  (props: Parameters<typeof sprinklesClassName>[0]) => {
    const style = responsiveSpacingVars(props);
    return { className: sprinklesClassName(props), ...(style && { style }) };
  },
  { properties: sprinklesClassName.properties },
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
  | "minWidth"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "width"
  | "zIndex"
>;
export type Sprinkles = Omit<Parameters<typeof sprinkles>[0], LonghandProps>;
