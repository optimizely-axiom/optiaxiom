import type { sprinkles } from "./sprinkles";

import { mapValues } from "../utils/mapValues";
import * as styles from "./properties.css";

/**
 * Read from the serialized sprinkles config: importing `conditions` from
 * `utils` would pull every `@optiaxiom/globals` token into the runtime bundle.
 */
const { responsiveArray } = styles.responsiveProps.conditions;

type Breakpoints = (typeof styles.spacingBreakpoints)[SpacingLonghand];

type SpacingLonghand = keyof typeof styles.spacingBreakpoints;

const withBreakpoints = <Value extends string>(
  values: Record<Value, { defaultClass: string }>,
  breakpoints: Breakpoints,
): {
  responsiveArray: typeof responsiveArray;
  values: Record<
    Value,
    {
      conditions: Record<"base" | keyof Breakpoints, string>;
      defaultClass: string;
    }
  >;
} => ({
  responsiveArray,
  values: mapValues(values, ({ defaultClass }) => ({
    conditions: {
      ...mapValues(breakpoints, ({ className }) => className),
      base: defaultClass,
    },
    defaultClass,
  })),
});

/**
 * `spacingProps` reshaped into a responsive sprinkles config: `base` keeps the
 * static class for each value while `sm`/`md` point every value at the
 * breakpoint's var-backed class. Built at runtime because exporting it from
 * `properties.css.ts` would serialize a class name per value per breakpoint.
 */
export const responsiveSpacingProps = {
  styles: {
    ...styles.spacingProps.styles,
    marginBottom: withBreakpoints(
      styles.spacingProps.styles.marginBottom.values,
      styles.spacingBreakpoints.marginBottom,
    ),
    marginLeft: withBreakpoints(
      styles.spacingProps.styles.marginLeft.values,
      styles.spacingBreakpoints.marginLeft,
    ),
    marginRight: withBreakpoints(
      styles.spacingProps.styles.marginRight.values,
      styles.spacingBreakpoints.marginRight,
    ),
    marginTop: withBreakpoints(
      styles.spacingProps.styles.marginTop.values,
      styles.spacingBreakpoints.marginTop,
    ),
    paddingBottom: withBreakpoints(
      styles.spacingProps.styles.paddingBottom.values,
      styles.spacingBreakpoints.paddingBottom,
    ),
    paddingLeft: withBreakpoints(
      styles.spacingProps.styles.paddingLeft.values,
      styles.spacingBreakpoints.paddingLeft,
    ),
    paddingRight: withBreakpoints(
      styles.spacingProps.styles.paddingRight.values,
      styles.spacingBreakpoints.paddingRight,
    ),
    paddingTop: withBreakpoints(
      styles.spacingProps.styles.paddingTop.values,
      styles.spacingBreakpoints.paddingTop,
    ),
  },
};

type SpacingSprinkles = Pick<
  Parameters<typeof sprinkles>[0],
  keyof typeof styles.spacingProps.styles
>;

// `Array.isArray` only narrows to `any[]`, which leaves sprinkles' readonly
// `ResponsiveArray` in the object branch.
const isArray = (value: unknown): value is readonly unknown[] =>
  Array.isArray(value);

const shorthands = Object.values(
  mapValues(styles.spacingProps.styles, (style, name) =>
    "mappings" in style ? { mappings: style.mappings, name } : undefined,
  ),
).filter((shorthand) => shorthand !== undefined);

const longhands = Object.values(
  mapValues(styles.spacingBreakpoints, (breakpoints, longhand) => ({
    breakpoints,
    // Props that set this longhand, ordered so later ones win as in sprinkles:
    // `p`, `px`, `pl`, then `paddingLeft`.
    propNames: [
      ...shorthands
        .filter(({ mappings }) =>
          mappings.some((mapping) => mapping === longhand),
        )
        .map(({ name }) => name),
      longhand,
    ],
  })),
);

/**
 * Inline vars for the breakpoint values of padding and margin props, resolved
 * per longhand with the same precedence sprinkles uses for the classes.
 */
export function responsiveSpacingVars(
  props: SpacingSprinkles,
): Record<string, string> | undefined {
  let vars: Record<string, string> | undefined;
  for (const longhand of longhands) {
    const value = longhand.propNames.reduce<
      SpacingSprinkles[keyof SpacingSprinkles]
    >((result, name) => props[name] ?? result, undefined);
    if (!value || typeof value !== "object") {
      continue;
    }
    responsiveArray.forEach((screen, i) => {
      const token = isArray(value) ? value[i] : value[screen];
      if (screen !== "base" && token) {
        vars ??= {};
        vars[longhand.breakpoints[screen].varName] =
          styles.spacingValues[token];
      }
    });
  }
  return vars;
}
