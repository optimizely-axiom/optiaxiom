import { Slot } from "@radix-ui/react-slot";
import "inter-ui/inter-variable.css";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { type ExtendProps, extractSprinkles } from "../utils";
import * as styles from "./Text.css";

type TextProps = ExtendProps<
  ComponentPropsWithRef<"p">,
  ComponentPropsWithRef<typeof Box>,
  styles.Sprinkles
>;

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ asChild, children, fontFamily = "sans", size = "md", ...props }, ref) => {
    const Comp = asChild ? Slot : "p";

    return (
      <Box
        asChild
        ref={ref}
        {...extractSprinkles(styles.sprinkles, {
          fontFamily,
          size,
          ...props,
        })}
      >
        <Comp>{children}</Comp>
      </Box>
    );
  },
);

Text.displayName = "@optiaxiom/react/Text";
