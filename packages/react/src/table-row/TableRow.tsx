import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./TableRow.css";
type TableRowProps = BoxProps<"tr">;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, ...props }, ref) => (
    <Box asChild {...styles.row({}, className)} {...props}>
      <tr ref={ref}> {children} </tr>
    </Box>
  ),
);
TableRow.displayName = "@optiaxiom/react/TableRow";
