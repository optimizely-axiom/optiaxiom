import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type GridProps = ComponentPropsWithRef<typeof Box>;

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  return (
    <Box display="grid" gap="16" gridTemplateColumns="1" ref={ref} {...props} />
  );
});

Grid.displayName = "@optiaxiom/react/Grid";
