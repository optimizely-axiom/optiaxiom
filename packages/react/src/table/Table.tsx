import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Table.css";

type TableProps = BoxProps<"table">;

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, ...props }, ref) => (
    <Box {...styles.wrapper()}>
      <Box asChild {...styles.table({}, className)} {...props}>
        <table ref={ref}>{children}</table>
      </Box>
    </Box>
  ),
);
Table.displayName = "@optiaxiom/react/Table";
