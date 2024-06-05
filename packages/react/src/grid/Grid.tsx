import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type GridProps = ComponentPropsWithRef<typeof Box>;

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  return <Box cols="1" display="grid" gap="md" ref={ref} {...props} />;
});

Grid.displayName = "@optiaxiom/react/Grid";
