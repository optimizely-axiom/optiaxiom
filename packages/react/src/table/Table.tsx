import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Table.css";

type TableProps = BoxProps<"table">;

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, ...props }, ref) => (
    <Box {...styles.wrapper({}, className)} ref={ref} {...props}>
      <Box asChild {...styles.table()}>
        <table ref={ref}>{children}</table>
      </Box>
    </Box>
  ),
);

Table.displayName = "@optiaxiom/react/Table";
