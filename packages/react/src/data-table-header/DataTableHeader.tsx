import type { ReactNode } from "react";

import { type Column } from "@tanstack/react-table";

import { Button } from "../button";
import { Flex } from "../flex";
import { IconSort } from "../icons/IconSort";
import { Tooltip } from "../tooltip";
import * as styles from "./DataTableHeader.css";

export const DataTableHeader = <TData,>({
  children,
  column,
  variant = "text",
}: {
  children?: ReactNode;
  column?: Column<TData, unknown>;
  variant?: "number" | "text";
}) => {
  if (!column) return null;
  return (
    <Flex {...styles.header({ variant })}>
      {children}
      {column.columnDef.enableSorting && (
        <Tooltip
          content={
            column.getCanSort()
              ? column.getNextSortingOrder() === "asc"
                ? "Sort ascending"
                : column.getNextSortingOrder() === "desc"
                  ? "Sort descending"
                  : "Clear sort"
              : undefined
          }
        >
          <Button
            border="0"
            icon={
              <IconSort
                sortDirection={column.getIsSorted() as "asc" | "desc" | false}
              />
            }
            onClick={() => column.toggleSorting()}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

DataTableHeader.displayName = "@optiaxiom/react/DataTableHeader";
