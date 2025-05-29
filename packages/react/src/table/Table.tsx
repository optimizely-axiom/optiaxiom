import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import * as styles from "./Table.css";

export type TableProps = BoxProps<"table", styles.TableVariants>;

export const Table = forwardRef<HTMLDivElement, TableProps>(
  ({ children, className, layout = "auto", style, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box
        ref={ref}
        style={style}
        {...styles.wrapper({}, className)}
        {...boxProps}
      >
        <Box asChild {...styles.table({ layout })} {...restProps}>
          <table>{children}</table>
        </Box>
      </Box>
    );
  },
);

Table.displayName = "@optiaxiom/react/Table";
