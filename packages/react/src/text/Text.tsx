import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { type ExtendProps } from "../utils";
import * as styles from "./Text.css";

type TextProps = ExtendProps<
  ComponentPropsWithRef<"p">,
  ComponentPropsWithRef<typeof Box>,
  styles.Sprinkles
>;

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      asChild,
      children,
      className,
      fontFamily = "sans",
      fontSize,
      lineHeight,
      size = "md",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "p";

    return (
      <Box
        asChild
        className={clsx(
          className,
          styles.sprinkles({
            fontSize,
            lineHeight,
            size,
          }),
        )}
        fontFamily={fontFamily}
        ref={ref}
        {...props}
      >
        <Comp>{children}</Comp>
      </Box>
    );
  },
);

Text.displayName = "@optiaxiom/react/Text";
