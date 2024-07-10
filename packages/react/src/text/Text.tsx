import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { type ExtendProps } from "../utils";
import * as styles from "./Text.css";

type TextProps = ExtendProps<
  ComponentPropsWithRef<"p">,
  ComponentPropsWithRef<typeof Box>,
  {
    as?: "p" | "span";
  } & styles.TextVariants
>;

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    { as = "p", asChild, children, className, lineClamp, truncate, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : as;

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
