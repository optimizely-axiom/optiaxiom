import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Grid.css";

type GridProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    cols?: styles.Sprinkles["cols"];
  }
>;

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, gap = "md", ...props }, ref) => {
    return (
      <Box
        className={clsx(
          className,
          styles.sprinkles({
            cols,
            gridTemplateColumns: "cols",
          }),
        )}
        display="grid"
        gap={gap}
        ref={ref}
        {...props}
      />
    );
  },
);

Grid.displayName = "@optiaxiom/react/Grid";
