import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type Header } from "@tanstack/react-table";
import { forwardRef } from "react";

import { ActionsContent } from "../actions-content";
import { ActionsRoot } from "../actions-root";
import { type BoxProps } from "../box";
import { Cover } from "../cover";
import { Icon } from "../icon";
import { IconSort } from "../icons/IconSort";
import { IconSortDown } from "../icons/IconSortDown";
import { IconSortUp } from "../icons/IconSortUp";
import { TableHeaderCell } from "../table-header-cell";
import * as styles from "./DataTableHeaderCell.css";

type DataTableHeaderCellProps = BoxProps<
  "th",
  {
    header: Header<unknown, unknown>;
  }
>;

export const DataTableHeaderCell = forwardRef<
  HTMLTableCellElement,
  DataTableHeaderCellProps
>(({ children, header, ...props }, ref) => {
  const sortDir = header.column.getIsSorted();

  return (
    <TableHeaderCell
      aria-sort={
        header.column.columnDef.enableSorting
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
      {header.column.columnDef.enableSorting ? (
        <ActionsRoot asChild>
          <Cover asChild inset overlay {...styles.button()}>
            <button onClick={() => header.column.toggleSorting()}>
              {children}

              {sortDir && (
                <VisuallyHidden>
                  sorted {sortDir === "asc" ? "ascending" : "descending"}
                </VisuallyHidden>
              )}

              <ActionsContent
                display="grid"
                placeItems="center"
                visible={!!sortDir}
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
        </ActionsRoot>
      ) : (
        children
      )}
    </TableHeaderCell>
  );
});

DataTableHeaderCell.displayName = "@optiaxiom/react/DataTableHeaderCell";
