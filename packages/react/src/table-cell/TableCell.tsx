import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./TableCell.css";

type TableCellProps = BoxProps<
  "td",
  {
    colSpan?: number;
  }
>;

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className, colSpan, ...props }, ref) => {
    return (
      <Box asChild {...styles.cell({}, className)} {...props}>
        <td colSpan={colSpan} ref={ref}>
          {children}
        </td>
      </Box>
    );
  },
);

TableCell.displayName = "@optiaxiom/react/TableCell";
