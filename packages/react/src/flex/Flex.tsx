import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { mapResponsiveValue } from "../sprinkles";

export type FlexProps = ComponentPropsWithRef<typeof Box>;

const mapDirectionToAlign = {
  column: "stretch",
  "column-reverse": "stretch",
  row: "center",
  "row-reverse": "center",
} as const;

/**
 * Stack items vertically or horizontally in a flex container.
 *
 * @extends Box
 *
 * @example <caption>Basic flex (default column direction with 16px gap)</caption>
 * <Flex>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Flex>
 *
 * @example <caption>Flex row (horizontal flex layout)</caption>
 * <Flex flexDirection="row">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Flex>
 *
 * @example <caption>Custom gap (custom spacing between items)</caption>
 * <Flex gap="8">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 *
 * @example <caption>Centered content (center items horizontally and vertically)</caption>
 * <Flex alignItems="center" justifyContent="center">
 *   <div>Centered content</div>
 * </Flex>
 *
 * @example <caption>Redundant flexDirection (anti-pattern, don't specify default)</caption>
 * ```
 * // ❌ BAD
 * <Flex flexDirection="column">
 *   <div>Item</div>
 * </Flex>
 *
 * // ✅ GOOD
 * <Flex>
 *   <div>Item</div>
 * </Flex>
 * ```
 *
 * @example <caption>Named tokens for gap (anti-pattern, use numeric values)</caption>
 * ```
 * // ❌ BAD
 * <Flex gap="md">
 *   <div>Item</div>
 * </Flex>
 *
 * // ✅ GOOD
 * <Flex gap="16">
 *   <div>Item</div>
 * </Flex>
 * ```
 *
 * @since 0.1.0
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ alignItems, flexDirection = "column", gap = "16", ...props }, ref) => {
    return (
      <Box
        alignItems={
          alignItems ??
          mapResponsiveValue(
            flexDirection,
            (value) => mapDirectionToAlign[value],
          )
        }
        display="flex"
        flexDirection={flexDirection}
        gap={gap}
        ref={ref}
        {...props}
      />
    );
  },
);

Flex.displayName = "@optiaxiom/react/Flex";
