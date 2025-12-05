import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { mapResponsiveValue } from "../sprinkles";

export type StackProps = BoxProps<
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
     * Default: 'row' (CSS standard)
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
 * A flexbox layout component for stacking items horizontally or vertically.
 *
 * Default Props:
 * - flexDirection: 'row' (CSS standard - horizontal layout)
 * - alignItems: 'center' (when row) or 'stretch' (when column)
 *
 * Common Usage:
 * - Horizontal button groups: <Stack gap="8"><Button /><Button /></Stack>
 * - Vertical forms: <Stack flexDirection="column" gap="16"><Input /><Input /></Stack>
 * - Icon + text combos: <Stack gap="4" alignItems="center"><Icon /><Text /></Stack>
 *
 * @category layout
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ alignItems, display = "flex", flexDirection = "row", ...props }, ref) => {
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
        ref={ref}
        {...props}
      />
    );
  },
);

Stack.displayName = "@optiaxiom/react/Stack";
