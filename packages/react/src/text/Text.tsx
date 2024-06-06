import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { type ExtendProps } from "../utils";
import * as styles from "./Text.css";

type TextProps = ExtendProps<
  ComponentPropsWithRef<"p">,
  ComponentPropsWithRef<typeof Box>,
  { as?: "label" | "p" | "span"; truncate?: boolean }
>;

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ as = "p", asChild, children, className, truncate, ...props }, ref) => {
    const Comp = asChild ? Slot : as;

    return (
      <Box
        asChild
        className={clsx(truncate && styles.truncate, className)}
        fontFamily="sans"
        fontSize="md"
        ref={ref}
        {...props}
      >
        <Comp>{children}</Comp>
      </Box>
    );
  },
);

Text.displayName = "@optiaxiom/react/Text";
