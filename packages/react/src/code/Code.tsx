import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Stack } from "../stack";
import * as styles from "./Code.css";

type CodeProps = ComponentPropsWithRef<typeof Stack>;

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "code";
    return (
      <Stack
        asChild
        bg="bg.neutral"
        className={clsx(className, styles.base)}
        display="inline-block"
        px="4"
        rounded="sm"
        {...props}
      >
        <Comp ref={ref}>{children}</Comp>
      </Stack>
    );
  },
);

Code.displayName = "@optiaxiom/react/Code";
