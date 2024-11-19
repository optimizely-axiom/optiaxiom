import * as RadixSeparator from "@radix-ui/react-separator";
import clsx from "clsx";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Separator.css";

type SeparatorProps = BoxProps<
  typeof RadixSeparator.Root,
  styles.SeparatorVariants
>;

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
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
