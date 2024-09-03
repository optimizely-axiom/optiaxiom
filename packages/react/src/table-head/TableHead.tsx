import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type TableHeaderProps = BoxProps<"thead">;

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, ...props }, ref) => (
    <Box asChild {...props}>
      <thead ref={ref}>{children}</thead>
    </Box>
  ),
);

TableHead.displayName = "@optiaxiom/react/TableHead";
