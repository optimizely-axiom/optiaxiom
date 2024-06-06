import * as RadixSeparator from "@radix-ui/react-separator";
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
  ({ className, orientation, ...props }, ref) => {
    return (
      <Box
        asChild
        className={clsx(styles.separator({ orientation }), className)}
        ref={ref}
        {...props}
      >
        <RadixSeparator.Root />
      </Box>
    );
  },
);

Separator.displayName = "@optiaxiom/react/Separator";
