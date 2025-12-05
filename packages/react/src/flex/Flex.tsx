import { forwardRef, useEffect } from "react";

import { Box, type BoxProps } from "../box";
import { mapResponsiveValue } from "../sprinkles";

export type FlexProps = BoxProps<
  "div",
  {
    /**
     * Set the element's `align-items` CSS property. Defaults to `center` when
     * `flexDirection='row'`, and `stretch` when `flexDirection='column'`.
     */
    alignItems?: BoxProps["alignItems"];
    /**
     * Set the element's `flex-direction` CSS property.
     *
     * ⚠️ DEFAULTS TO 'column' (vertical stacking) - NOT 'row' like standard CSS!
     *
     * - Default: 'column'
     * - For horizontal layouts: explicitly set flexDirection='row'
     * - When direction is 'row', alignItems defaults to 'center'
     * - When direction is 'column', alignItems defaults to 'stretch'
     */
    flexDirection?: BoxProps["flexDirection"];
  }
>;

const mapDirectionToAlign = {
  column: "stretch",
  "column-reverse": "stretch",
  row: "center",
  "row-reverse": "center",
} as const;

let hasWarnedDeprecation = false;

/**
 * Stack items vertically or horizontally in a flex container.
 *
 * 🚨 Use `<Flex>` for vertical stacking and `<Flex flexDirection="row">` for
 * horizontal stacking, as our component does NOT use the standard CSS `row`
 * default.
 *
 * Best Practices:
 * - Use Flex for layout direction (flexDirection, gap, alignment)
 * - Use Box for simpler styling needs (padding, margin, borders, colors)
 * - Box is a lighter primitive; Flex adds flexbox-specific defaults
 *
 * Default Props:
 * - flexDirection: 'column' (NOT 'row' like CSS!)
 * - gap: '16'
 * - alignItems: 'stretch' (when column) or 'center' (when row)
 *
 * @category layout
 * @extends Box
 * @deprecated since 1.8.0 use {@link Stack} instead
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      alignItems,
      display = "flex",
      flexDirection = "column",
      gap = "16",
      ...props
    },
    ref,
  ) => {
    // Runtime deprecation warning (dev only, once per page across all instances)
    useEffect(() => {
      if (process.env.NODE_ENV !== "production" && !hasWarnedDeprecation) {
        hasWarnedDeprecation = true;
        console.warn(
          "[Deprecation] Flex is deprecated and will be removed in v2.0.\n" +
            "Please migrate to Stack which uses CSS-standard defaults.\n" +
            "Run: npx @optiaxiom/codemod flex-to-stack src/\n" +
            "Docs: https://optimizely-axiom.github.io/optiaxiom/migration/stack",
        );
      }
    }, []);

    return (
      <Box
        alignItems={
          alignItems ??
          mapResponsiveValue(
            flexDirection,
            (value) => mapDirectionToAlign[value],
          )
        }
        display={display}
        flexDirection={flexDirection}
        gap={gap}
        ref={ref}
        {...props}
      />
    );
  },
);

Flex.displayName = "@optiaxiom/react/Flex";
