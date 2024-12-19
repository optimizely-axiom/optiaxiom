import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./TableHeaderCell.css";

type TableHeaderCellProps = BoxProps<"th">;

export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(({ children, className, colSpan, ...props }, ref) => (
  <Box asChild {...styles.cell({}, className)} {...props}>
    <th colSpan={colSpan} ref={ref}>
      <Box {...styles.content()}>{children}</Box>
    </th>
  </Box>
));

TableHeaderCell.displayName = "@optiaxiom/react/TableHeaderCell";
