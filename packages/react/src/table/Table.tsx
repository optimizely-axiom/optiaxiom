import { forwardRef, type RefObject } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Table.css";

type TableProps = BoxProps<
  "table",
  {
    containerRef?: RefObject<HTMLDivElement>;
  }
>;

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, containerRef, ...props }, ref) => (
    <Box {...styles.wrapper({}, className)} ref={containerRef} {...props}>
      <Box asChild {...styles.table()}>
        <table ref={ref}>{children}</table>
      </Box>
    </Box>
  ),
);

Table.displayName = "@optiaxiom/react/Table";
