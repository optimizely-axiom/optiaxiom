import * as RadixSeparator from "@radix-ui/react-separator";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { Sprinkles } from "../sprinkles";

import { Box } from "../box";
import { type ExtendProps } from "../utils";
import * as styles from "./Separator.css";

type SeparatorProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixSeparator.Root>,
  ComponentPropsWithRef<typeof Box>,
  {
    /**
     * Control the width/height depending on the orientation.
     */
    size?: Sprinkles["size"];
  } & styles.SeparatorVariants
>;

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, orientation = "horizontal", size = 1, ...props }, ref) => {
    return (
      <Box
        asChild
        className={clsx(styles.separator({ orientation }), className)}
        ref={ref}
        {...{ [orientation === "horizontal" ? "h" : "w"]: size }}
        {...props}
      >
        <RadixSeparator.Root />
      </Box>
    );
  },
);

Separator.displayName = "@optiaxiom/react/Separator";
