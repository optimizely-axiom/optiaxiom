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
 * @deprecated since 1.8.0 - use {@link Group} instead.
 *
 * To migrate existing Flex code: `npx @optiaxiom/codemod flex-to-group src/`
 *
 * ⚠️ Flex defaults to flexDirection='column' (NOT 'row' like standard CSS)
 * and gap='16'. Group uses standard CSS defaults (flexDirection='row', no
 * default gap).
 *
 * @category layout
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
