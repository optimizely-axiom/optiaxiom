import * as RadixSeparator from "@radix-ui/react-separator";
import clsx from "clsx";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useResponsiveMatches } from "../hooks";
import { normalizeResponsiveValue } from "../sprinkles";
import * as styles from "./Separator.css";

export type SeparatorProps = BoxProps<
  typeof RadixSeparator.Root,
  styles.SeparatorVariants
>;

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    const resolvedOrientation = useResponsiveMatches({
      base: "horizontal",
      ...normalizeResponsiveValue(orientation),
    });

    return (
      <Box
        asChild
        ref={ref}
        {...styles.base({}, clsx(styles.separator({ orientation }), className))}
        {...props}
      >
        <RadixSeparator.Root orientation={resolvedOrientation} />
      </Box>
    );
  },
);

Separator.displayName = "@optiaxiom/react/Separator";
