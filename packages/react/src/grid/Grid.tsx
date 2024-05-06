import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type GridProps = ComponentPropsWithRef<typeof Box>;

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ cols = "1", gap = "md", ...props }, ref) => {
    return <Box cols={cols} display="grid" gap={gap} ref={ref} {...props} />;
  },
);

Grid.displayName = "@optiaxiom/react/Grid";
