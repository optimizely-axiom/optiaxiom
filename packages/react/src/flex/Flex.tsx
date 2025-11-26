import { forwardRef } from "react";

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

/**
 * Stack items vertically or horizontally in a flex container.
 *
 * 🚨 CRITICAL: DEFAULT IS VERTICAL (flexDirection='column')
 *
 * Unlike standard CSS flexbox which defaults to row, Axiom Flex defaults to
 * flexDirection='column' (VERTICAL stacking). For horizontal layouts, you
 * MUST explicitly set flexDirection='row'.
 *
 * Default Props:
 * - flexDirection: 'column' (NOT 'row' like CSS!)
 * - gap: '16'
 * - alignItems: 'stretch' (when column) or 'center' (when row)
 *
 * @extends Box
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
