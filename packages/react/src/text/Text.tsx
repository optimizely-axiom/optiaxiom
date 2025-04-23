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
