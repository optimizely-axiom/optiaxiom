import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./TableHeaderCell.css";

export type TableHeaderCellProps = BoxProps<
  "th",
  NonNullable<styles.CellVariants>
>;

/**
 * Header cell for a `Table` column.
 *
 * Children are laid out in a flex row, so `textAlign` on the cell does not
 * move them. To align a header, wrap its content in a box that fills the row:
 * `<TableHeaderCell><Box flex="1" textAlign="end">Price</Box></TableHeaderCell>`.
 *
 * @group Table
 */
export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(
  (
    {
      children,
      className,
      colSpan,
      p,
      pinned = false,
      px = "16",
      py = "12",
      ...props
    },
    ref,
  ) => (
    <Box
      asChild
      data-pinned={pinned ? "" : undefined}
      {...styles.cell({ pinned }, className)}
      {...props}
    >
      <th colSpan={colSpan} ref={ref}>
        <Box {...styles.content()} px={p ?? px} py={p ?? py}>
          {children}
        </Box>
      </th>
    </Box>
  ),
);

TableHeaderCell.displayName = "@optiaxiom/react/TableHeaderCell";
