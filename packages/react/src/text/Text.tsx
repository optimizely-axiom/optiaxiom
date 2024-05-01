import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { type ExtendProps } from "../utils";

type TextProps = ExtendProps<
  ComponentPropsWithRef<"p">,
  ComponentPropsWithRef<typeof Box>,
  { as?: "label" | "p" | "span" }
>;

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ as = "p", asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : as;

    return (
      <Box asChild fontFamily="sans" fontSize="md" ref={ref} {...props}>
        <Comp>{children}</Comp>
      </Box>
    );
  },
);

Text.displayName = "@optiaxiom/react/Text";
