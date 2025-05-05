import { forwardRef } from "react";

import { ActionsRoot } from "../actions";
import { Box, type BoxProps } from "../box";
import * as styles from "./TableRow.css";

export type TableRowProps = BoxProps<"tr">;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, ...props }, ref) => (
    <ActionsRoot asChild>
      <Box asChild {...styles.row({}, className)} {...props}>
        <tr ref={ref}>{children}</tr>
      </Box>
    </ActionsRoot>
  ),
);

TableRow.displayName = "@optiaxiom/react/TableRow";
