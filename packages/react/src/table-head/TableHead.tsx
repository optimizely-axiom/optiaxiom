import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./TableHead.css";

type TableHeadProps = BoxProps<"th">;

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ children, className, colSpan, ...props }, ref) => (
    <Box asChild {...styles.head({}, className)} {...props}>
      <th colSpan={colSpan} ref={ref}>
        {children}
      </th>
    </Box>
  ),
);

TableHead.displayName = "@optiaxiom/react/TableHead";
