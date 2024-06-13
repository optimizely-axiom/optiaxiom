import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { type ExtendProps } from "../utils";
import * as styles from "./Text.css";

type TextProps = ExtendProps<
  ComponentPropsWithRef<"p">,
  ComponentPropsWithRef<typeof Box>,
  {
    as?: "p" | "span";
    lineClamp?: keyof typeof styles.lineClamp;
    truncate?: boolean;
  }
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
        className={clsx(
          lineClamp && styles.lineClamp[lineClamp],
          truncate && styles.truncate,
          className,
        )}
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
