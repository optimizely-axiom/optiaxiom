import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import "inter-ui/inter-variable.css";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { type Sprinkles } from "../box";
import * as styles from "./Text.css";

type TextProps = Omit<
  ComponentPropsWithRef<"p"> & ComponentPropsWithRef<typeof Box>,
  "size"
> & {
  size?: Sprinkles["fontSize"];
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ asChild, children, className, size: sizeProp, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    const size = sizeProp ?? "md";

    return (
      <Box
        asChild
        className={clsx(className, styles.base)}
        fontSize={size}
        lineHeight={size}
        ref={ref}
        {...props}
      >
        <Comp>{children}</Comp>
      </Box>
    );
  },
);
