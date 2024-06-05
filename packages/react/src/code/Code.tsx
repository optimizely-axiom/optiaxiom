import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Code.css";

type CodeProps = ExtendProps<
  ComponentPropsWithRef<"code">,
  ComponentPropsWithRef<typeof Box>
>;

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "code";
    return (
      <Box
        asChild
        bg="bg.neutral"
        className={clsx(className, styles.base)}
        display="inline-block"
        px="4"
        rounded="sm"
        {...props}
      >
        <Comp ref={ref}>{children}</Comp>
      </Box>
    );
  },
);

Code.displayName = "@optiaxiom/react/Code";
