import type { ReactNode } from "react";

import { type Column } from "@tanstack/react-table";

import { Box } from "../box";
import { Button } from "../button";
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
    );
  };

  return (
    <Box display="flex" justifyContent={variant === "number" ? "end" : "start"}>
      {column.columnDef.enableSorting ? (
        <Button
          addonAfter={variant === "number" ? null : renderSortIcon()}
          addonBefore={variant === "number" ? renderSortIcon() : null}
          appearance="subtle"
          justifyContent={variant === "number" ? "end" : "start"}
          onClick={() => column.toggleSorting()}
          {...styles.button()}
        >
          {children}
        </Button>
      ) : (
        children
      )}
    </Box>
  );
};

DataTableHeader.displayName = "@optiaxiom/react/DataTableHeader";
