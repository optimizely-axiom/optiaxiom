import type { ReactNode } from "react";

import { type Column } from "@tanstack/react-table";

import { Box } from "../box";
import { Icon } from "../icon";
import { IconSort } from "../icons/IconSort";
import { IconSortDown } from "../icons/IconSortDown";
import { IconSortUp } from "../icons/IconSortUp";
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

  const renderSortIcon = () => {
    return (
      <Icon asChild flex="none" h="16" w="auto">
        {column.getIsSorted() === false ? (
          <IconSort />
        ) : column.getIsSorted() === "asc" ? (
          <IconSortUp />
        ) : (
          <IconSortDown />
        )}
      </Icon>
    );
  };

  return (
    <Box display="flex" justifyContent={variant === "number" ? "end" : "start"}>
      {column.columnDef.enableSorting ? (
        <Box asChild {...styles.button()}>
          <button onClick={() => column.toggleSorting()}>
            {variant === "number" && renderSortIcon()}
            {children}
            {variant === "text" && renderSortIcon()}
          </button>
        </Box>
      ) : (
        children
      )}
    </Box>
  );
};

DataTableHeader.displayName = "@optiaxiom/react/DataTableHeader";
