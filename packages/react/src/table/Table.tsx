import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import * as styles from "./Table.css";

export type TableProps = BoxProps<"table", styles.TableVariants>;

/**
 * Display tabular data using rows and columns.
 *
 * ⚠️ **IMPORTANT**: Consider using `DataTable` instead for displaying tabular
 * data.
 *
 * `DataTable` provides built-in support for:
 * - Sorting (client-side and server-side)
 * - Pagination (client-side and server-side)
 * - Row selection with checkboxes
 * - Column pinning (sticky columns)
 * - Row expansion
 * - Loading states
 * - Virtualization for large datasets
 *
 * `Table` is a low-level primitive and should only be used for very specific
 * custom table layouts. For most use cases, `DataTable` is the recommended
 * choice.
 *
 * @group Table
 * @since 1.4.0
 */
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
