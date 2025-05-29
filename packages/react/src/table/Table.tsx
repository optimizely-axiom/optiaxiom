import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import * as styles from "./Table.css";

export type TableProps = BoxProps<"table", styles.TableVariants>;

export const Table = forwardRef<HTMLDivElement, TableProps>(
  ({ children, className, layout = "auto", ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box {...styles.wrapper({}, className)} ref={ref} {...boxProps}>
        <Box asChild {...styles.table({ layout })} {...restProps}>
          <table>{children}</table>
        </Box>
      </Box>
    );
  },
);

Table.displayName = "@optiaxiom/react/Table";
