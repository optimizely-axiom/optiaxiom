import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./TableHeaderCell.css";

type TableHeadProps = BoxProps<"th">;

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ children, className, colSpan, ...props }, ref) => (
    <Box asChild {...styles.head({}, className)} {...props}>
      <th colSpan={colSpan} ref={ref}>
        {children}
      </th>
    </Box>
  ),
);

TableHeaderCell.displayName = "@optiaxiom/react/TableHeaderCell";
