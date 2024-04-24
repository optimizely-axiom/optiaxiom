import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Grid.css";

type GridProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    align?: styles.Sprinkles["alignItems"];
    cols?: styles.Sprinkles["cols"];
    gap?: styles.Sprinkles["gap"];
    justify?: styles.Sprinkles["justifyContent"];
  }
>;

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ align, className, cols = 1, gap = "md", justify, ...props }, ref) => {
    return (
      <Box
        className={clsx(
          className,
          styles.sprinkles({
            alignItems: align,
            cols,
            gap,
            gridTemplateColumns: "cols",
            justifyContent: justify,
          }),
        )}
        display="grid"
        ref={ref}
        {...props}
      />
    );
  },
);

Grid.displayName = "@optiaxiom/react/Grid";
