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
 * Renders text content for body copy, descriptions, and general text without
 * semantic meaning.
 *
 * Use this for paragraphs, captions, descriptions, and non-heading text.
 *
 * When not to use:
 * - For headings and titles use Heading instead.
 * - For form labels use Label instead.
 * - Don't combine large fontSize ('xl'+) with bold fontWeight ('500'+) - that
 *   indicates a heading.
 *
 * @since 0.1.0
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
