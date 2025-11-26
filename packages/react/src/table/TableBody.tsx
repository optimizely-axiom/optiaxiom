import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./TableBody.css";

export type TableBodyProps = BoxProps<"tbody">;

/**
 * @group Table
 */
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...props }, ref) => (
    <Box asChild {...styles.body({}, className)} {...props}>
      <tbody ref={ref}>{children}</tbody>
    </Box>
  ),
);

TableBody.displayName = "@optiaxiom/react/TableBody";
