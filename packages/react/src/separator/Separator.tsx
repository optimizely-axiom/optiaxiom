import * as RadixSeparator from "@radix-ui/react-separator";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { type ExtendProps } from "../utils";
import * as styles from "./Separator.css";

type SeparatorProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixSeparator.Root>,
  ComponentPropsWithRef<typeof Box>
> &
  styles.SeparatorVaiants;

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  ({ asChild, className, orientation, ...props }, ref) => {
    const Comp = asChild ? Slot : RadixSeparator.Root;

    return (
      <Box
        asChild
        className={clsx(styles.separator({ orientation }), className)}
        ref={ref}
        {...props}
      >
        <Comp />
      </Box>
    );
  },
);

Separator.displayName = "@optiaxiom/react/Separator";
