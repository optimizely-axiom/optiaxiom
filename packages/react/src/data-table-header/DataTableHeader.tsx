import type { ReactNode } from "react";

import { type Header } from "@tanstack/react-table";

import { Button } from "../button";
import { Flex } from "../flex";
import { IconSort } from "../icons/IconSort";
import { Tooltip } from "../tooltip";
import * as styles from "./DataTableHeader.css";

export const DataTableHeader = <TData,>({
  children,
  header,
  variant = "text",
}: {
  children?: ReactNode;
  header?: Header<TData, unknown>;
  variant?: "number" | "text";
}) => {
  return (
    <Flex {...styles.header({ variant })}>
      {children}
      {header?.column.columnDef.enableSorting && (
        <Tooltip
          content={
            header.column.getCanSort()
              ? header.column.getNextSortingOrder() === "asc"
                ? "Sort ascending"
                : header.column.getNextSortingOrder() === "desc"
                  ? "Sort descending"
                  : "Clear sort"
              : undefined
          }
        >
          <Button
            border="0"
            icon={
              <IconSort
                sortDirection={
                  header.column.getIsSorted() as "asc" | "desc" | false
                }
              />
            }
            onClick={() => header.column.toggleSorting()}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

DataTableHeader.displayName = "@optiaxiom/react/DataTableHeader";
