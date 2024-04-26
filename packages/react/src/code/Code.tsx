import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import * as styles from "./Code.css";

type CodeProps = ComponentPropsWithRef<typeof Box>;

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "code";
    return (
      <Box
        asChild
        background="bg.neutral"
        borderRadius="sm"
        className={clsx(className, styles.base)}
        fontFamily="mono"
        paddingX="0.5"
        paddingY="0.25"
        {...props}
      >
        <Comp ref={ref}>{children}</Comp>
      </Box>
    );
  },
);

Code.displayName = "@optiaxiom/react/Code";
