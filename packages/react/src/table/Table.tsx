import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Table.css";

export type TableProps = BoxProps<"div", styles.TableVariants>;

export const Table = forwardRef<HTMLDivElement, TableProps>(
  ({ children, className, layout = "auto", ...props }, ref) => (
    <Box {...styles.wrapper({}, className)} ref={ref} {...props}>
      <Box asChild {...styles.table({ layout })}>
        <table>{children}</table>
      </Box>
    </Box>
  ),
);

Table.displayName = "@optiaxiom/react/Table";
