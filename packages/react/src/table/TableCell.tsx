import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./TableCell.css";

export type TableCellProps = BoxProps<"td", NonNullable<styles.CellVariants>>;

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className, colSpan, pinned = false, ...props }, ref) => {
    return (
      <Box asChild {...styles.cell({ pinned }, className)} {...props}>
        <td colSpan={colSpan} ref={ref}>
          {children}
        </td>
      </Box>
    );
  },
);

TableCell.displayName = "@optiaxiom/react/TableCell";
