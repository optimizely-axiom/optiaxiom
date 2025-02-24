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
import { Separator } from "../separator";
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
    <ActionsRoot asChild>
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
        {header.column.columnDef.enableResizing && (
          <ActionsContent visible={header.column.getIsResizing()}>
            <Separator
              onDoubleClick={() => header.column.resetSize()}
              onMouseDown={header.getResizeHandler()}
              onTouchStart={header.getResizeHandler()}
              orientation="vertical"
              style={{
                transform:
                  header.getContext().table.options.columnResizeMode ===
                    "onEnd" && header.column.getIsResizing()
                    ? `translateX(${header.getContext().table.getState().columnSizingInfo.deltaOffset}px)`
                    : "",
              }}
              {...styles.handle({
                resizing: header.column.getIsResizing(),
              })}
            />
          </ActionsContent>
        )}

        {header.column.columnDef.enableSorting ? (
          <Cover asChild inset {...styles.button()}>
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
        ) : (
          children
        )}
      </TableHeaderCell>
    </ActionsRoot>
  );
});

DataTableHeaderCell.displayName = "@optiaxiom/react/DataTableHeaderCell";
