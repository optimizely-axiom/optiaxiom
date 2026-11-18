import { IconAngleDown } from "@optiaxiom/icons/IconAngleDown";
import { IconChevronRight } from "@optiaxiom/icons/IconChevronRight";
import { useId } from "@radix-ui/react-id";
import clsx from "clsx";
import { type ReactNode } from "react";

import { Box } from "../box";
import { Button } from "../button";
import { Group } from "../group";
import { useMessages } from "../locale";
import { useDataTableContext } from "./DataTableContext";
import { useDataTableRowContext } from "./DataTableRowContext";

/**
 * The cell context TanStack Table passes to a column's `cell` (v8 or v9),
 * narrowed to what the expandable cell reads.
 */
export type DataTableExpandableCellProps<TData, TValue> = {
  children?: ReactNode;
  getValue(): TValue;
  /**
   * The row the cell belongs to.
   */
  row: {
    /**
     * How deeply the row is nested; indents the cell by one step per level.
     */
    depth: number;
    getCanExpand?(): boolean;
    getIsExpanded?(): boolean;
    getToggleExpandedHandler?(): () => void;
    /**
     * The data item the row was built from.
     */
    original: TData;
  };
};

/**
 * Table cell component with expandable row functionality.
 *
 * @group DataTable
 * @experimental
 */
export function DataTableExpandableCell<TData, TValue>({
  children,
  getValue,
  row,
}: DataTableExpandableCellProps<TData, TValue>) {
  const labelPrefixId = useId();
  const messages = useMessages();
  const { table } = useDataTableContext(
    "@optiaxiom/react/DataTableExpandableCell",
  );
  const { labelId } = useDataTableRowContext(
    "@optiaxiom/react/DataTableExpandableCell",
  );
  return (
    <Group alignItems="start" gap="8">
      {Array.from({ length: row.depth }).map((_, index) => (
        <Box flex="none" key={index} w="sm" />
      ))}
      {table.getCanRowExpand(row) ? (
        <Button
          appearance="subtle"
          aria-expanded={table.getIsRowExpanded(row)}
          aria-label={messages["Toggle row"]}
          aria-labelledby={clsx(labelPrefixId, labelId)}
          flex="none"
          icon={
            table.getIsRowExpanded(row) ? (
              <IconAngleDown />
            ) : (
              <IconChevronRight />
            )
          }
          id={labelPrefixId}
          onClick={table.getToggleRowExpandedHandler(row)}
          size="sm"
          style={{ marginBlock: -2 }}
          type="button"
        />
      ) : (
        <Box flex="none" w="sm" />
      )}
      {children ?? (getValue() as string)}
    </Group>
  );
}

DataTableExpandableCell.displayName =
  "@optiaxiom/react/DataTableExpandableCell";
