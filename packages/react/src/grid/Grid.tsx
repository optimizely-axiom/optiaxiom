import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

export type GridProps = ComponentPropsWithRef<typeof Box>;

/**
 * Use `Grid` component to place items in a grid using equal width columns.
 *
 * @since 0.1.0
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    { display = "grid", gap = "16", gridTemplateColumns = "1", ...props },
    ref,
  ) => {
    return (
      <Box
        display={display}
        gap={gap}
        gridTemplateColumns={gridTemplateColumns}
        ref={ref}
        {...props}
      />
    );
  },
);

Grid.displayName = "@optiaxiom/react/Grid";
