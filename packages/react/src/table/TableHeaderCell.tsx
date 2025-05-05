import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./TableHeaderCell.css";

export type TableHeaderCellProps = BoxProps<"th">;

export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(
  (
    { children, className, colSpan, p, px = "16", py = "12", ...props },
    ref,
  ) => (
    <Box asChild {...styles.cell({}, className)} {...props}>
      <th colSpan={colSpan} ref={ref}>
        <Box {...styles.content()} px={p ?? px} py={p ?? py}>
          {children}
        </Box>
      </th>
    </Box>
  ),
);

TableHeaderCell.displayName = "@optiaxiom/react/TableHeaderCell";
