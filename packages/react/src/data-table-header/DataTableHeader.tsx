import type { ReactNode } from "react";

import { type Column } from "@tanstack/react-table";

import { Flex } from "../flex";
import { Icon } from "../icon";
import { IconSort } from "../icons/IconSort";
import { IconSortDown } from "../icons/IconSortDown";
import { IconSortUp } from "../icons/IconSortUp";
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
    <Flex
      {...styles.header({
        sortable: column.columnDef.enableSorting,
        variant,
      })}
      onClick={() => column.columnDef.enableSorting && column.toggleSorting()}
    >
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
          <Icon
            asChild
            {...styles.icon({
              sorted: column.getIsSorted() === false ? false : true,
            })}
          >
            {column.getIsSorted() === false ? (
              <IconSort />
            ) : column.getIsSorted() === "asc" ? (
              <IconSortUp />
            ) : (
              <IconSortDown />
            )}
          </Icon>
        </Tooltip>
      )}
    </Flex>
  );
};

DataTableHeader.displayName = "@optiaxiom/react/DataTableHeader";
