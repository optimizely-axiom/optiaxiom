import * as RadixSeparator from "@radix-ui/react-separator";
import clsx from "clsx";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useResponsiveMatches } from "../hooks";
import { normalizeResponsiveValue } from "../sprinkles";
import * as styles from "./Separator.css";

export type SeparatorProps = BoxProps<
  typeof RadixSeparator.Root,
  styles.SeparatorVariants
>;

/**
 * component is used to visually separate items in a list or group. By default the orientation is set to `horizontal`.
 *
 * @since 0.1.0
 *
 * @example
 * <Box>
 *   <Text fontWeight="600">Axiom</Text>
 *   <Text>Optimizely Design System</Text>
 *   <Separator my="12" />
 *   <Flex flexDirection="row" gap="12">
 *     <Text>Installation</Text>
 *     <Separator orientation="vertical" />
 *     <Text>Design</Text>
 *     <Separator orientation="vertical" />
 *     <Text>Components</Text>
 *   </Flex>
 * </Box>
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    const resolvedOrientation = useResponsiveMatches({
      base: "horizontal",
      ...normalizeResponsiveValue(orientation),
    });

    return (
      <Box
        asChild
        ref={ref}
        {...styles.base({}, clsx(styles.separator({ orientation }), className))}
        {...props}
      >
        <RadixSeparator.Root orientation={resolvedOrientation} />
      </Box>
    );
  },
);

Separator.displayName = "@optiaxiom/react/Separator";
