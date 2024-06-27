import * as RadixSeparator from "@radix-ui/react-separator";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { type ExtendProps } from "../utils";
import * as styles from "./Separator.css";

type SeparatorProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixSeparator.Root>,
  ComponentPropsWithRef<typeof Box>,
  styles.SeparatorVariants
>;

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <Box
        asChild
        ref={ref}
        {...styles.base({}, clsx(styles.separator({ orientation }), className))}
        {...props}
      >
        <RadixSeparator.Root />
      </Box>
    );
  },
);

Separator.displayName = "@optiaxiom/react/Separator";
