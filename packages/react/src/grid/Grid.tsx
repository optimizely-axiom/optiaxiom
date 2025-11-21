import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

export type GridProps = ComponentPropsWithRef<typeof Box>;

/**
 * Use `Grid` component to place items in a grid using equal width columns.
 *
 * @since 0.1.0
 *
 * @example
 * <Grid gridTemplateColumns="3">
 *   <div>01</div>
 *   <div>02</div>
 *   <div>03</div>
 *   <div>04</div>
 *   <div>05</div>
 *   <div>06</div>
 *   <div>07</div>
 * </Grid>
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  return (
    <Box display="grid" gap="16" gridTemplateColumns="1" ref={ref} {...props} />
  );
});

Grid.displayName = "@optiaxiom/react/Grid";
