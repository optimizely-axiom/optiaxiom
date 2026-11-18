import { forwardRef } from "react";

import { ActionsContent, ActionsRoot } from "../actions";
import { type BoxProps } from "../box";
import { Cover } from "../cover";
import { Icon } from "../icon";
import { IconSort } from "../icons/IconSort";
import { IconSortDown } from "../icons/IconSortDown";
import { IconSortUp } from "../icons/IconSortUp";
import { useMessages } from "../locale";
import { Separator } from "../separator";
import { TableHeaderCell } from "../table";
import { VisuallyHidden } from "../visually-hidden";
import { useDataTableContext } from "./DataTableContext";
import * as styles from "./DataTableHeaderCell.css";
import { type TanStackHeader } from "./tanstack";

export type DataTableHeaderCellProps = BoxProps<
  typeof TableHeaderCell,
  {
    /**
     * The Header instance to render.
     */
    header: TanStackHeader;
  }
>;

/**
 * Table header cell with sorting and resizing functionality.
 *
 * @group DataTable
 * @experimental
 */
export const DataTableHeaderCell = forwardRef<
  HTMLTableCellElement,
  DataTableHeaderCellProps
>(({ children, header, ...props }, ref) => {
  const { table } = useDataTableContext("@optiaxiom/react/DataTableHeaderCell");
  const sortDir = table.getIsSorted(header.column);
  const messages = useMessages();

  return (
    <ActionsRoot asChild>
      <TableHeaderCell
        aria-sort={
          table.getCanSort(header.column)
            ? sortDir === false
              ? "none"
              : sortDir === "asc"
                ? "ascending"
                : "descending"
            : undefined
        }
        colSpan={header.colSpan}
        ref={ref}
        {...props}
      >
        {table.getCanResize(header.column) && (
          <ActionsContent
            visible={
              table.getIsResizing(header.column) ? "always" : "if-needed"
            }
          >
            {/* Pointer-only: react-table's resize handler has no keyboard support, so an exposed separator would be an unusable, unnamed stop for screen readers. */}
            <Separator
              aria-hidden="true"
              onDoubleClick={() => table.resetSize(header.column)}
              onMouseDown={table.getResizeHandler(header)}
              onTouchStart={table.getResizeHandler(header)}
              orientation="vertical"
              style={{
                transform:
                  table.getIsResizing(header.column) &&
                  typeof table.getResizeDeltaOffset() === "number"
                    ? `translateX(${table.getResizeDeltaOffset()}px)`
                    : "",
              }}
              {...styles.handle({
                resizing: table.getIsResizing(header.column),
              })}
            />
          </ActionsContent>
        )}

        {table.getCanSort(header.column) ? (
          <Cover asChild inset {...styles.button()}>
            <button onClick={() => table.toggleSorting(header.column)}>
              {children}

              {/* Browsers already separate flex items in the accessible name; the explicit space keeps the source readable as "Name sorted ascending". */}
              {sortDir && " "}
              {sortDir && (
                <VisuallyHidden>
                  {sortDir === "asc"
                    ? messages["sorted ascending"]
                    : messages["sorted descending"]}
                </VisuallyHidden>
              )}

              <ActionsContent
                display="grid"
                placeItems="center"
                visible={sortDir ? "always" : "if-needed"}
              >
                <Icon asChild {...styles.icon({ active: sortDir === false })}>
                  <IconSort />
                </Icon>
                <Icon asChild {...styles.icon({ active: sortDir === "asc" })}>
                  <IconSortUp />
                </Icon>
                <Icon asChild {...styles.icon({ active: sortDir === "desc" })}>
                  <IconSortDown />
                </Icon>
              </ActionsContent>
            </button>
          </Cover>
        ) : (
          children
        )}
      </TableHeaderCell>
    </ActionsRoot>
  );
});

DataTableHeaderCell.displayName = "@optiaxiom/react/DataTableHeaderCell";
