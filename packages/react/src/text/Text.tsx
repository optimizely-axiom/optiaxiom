import { createSlot } from "@radix-ui/react-slot";
import { type ElementType, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box, type BoxProps } from "../box";
import * as styles from "./Text.css";

const Slot = createSlot("@optiaxiom/react/Text");

export type TextProps<T extends ElementType = "p", P = unknown> = BoxProps<
  T,
  ExtendProps<styles.TextVariants, P>
>;

/**
 * Display body or any other form of text. By default it outputs the `<p>` paragraph element.
 *
 * @since 0.1.0
 *
 * @example
 * <Flex>
 *   <Text fontSize="xs">Extra small text</Text>
 *   <Text fontSize="sm">Small text</Text>
 *   <Text fontSize="md">Default text</Text>
 *   <Text fontSize="lg">Large text</Text>
 *   <Text fontSize="xl">Extra large text</Text>
 * </Flex>
 */
export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ asChild, children, className, lineClamp, truncate, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";

    return (
      <Box
        asChild
        ref={ref}
        {...styles.text({ lineClamp, truncate }, className)}
        {...props}
      >
        <Comp>{children}</Comp>
      </Box>
    );
  },
);

Text.displayName = "@optiaxiom/react/Text";
