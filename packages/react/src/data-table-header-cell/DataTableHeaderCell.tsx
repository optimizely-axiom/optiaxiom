import type { ReactNode } from "react";

import { type Column } from "@tanstack/react-table";

import { Box } from "../box";
import { Icon } from "../icon";
import { IconSort } from "../icons/IconSort";
import { IconSortDown } from "../icons/IconSortDown";
import { IconSortUp } from "../icons/IconSortUp";
import * as styles from "./DataTableHeaderCell.css";

export const DataTableHeaderCell = ({
  children,
  column,
}: {
  children?: ReactNode;
  column: Column<unknown>;
}) => {
  return (
    <Box>
      {column.columnDef.enableSorting ? (
        <Box asChild {...styles.button()}>
          <button onClick={() => column.toggleSorting()}>
            {children}

            <Icon asChild h="12">
              {column.getIsSorted() === false ? (
                <IconSort />
              ) : column.getIsSorted() === "asc" ? (
                <IconSortUp />
              ) : (
                <IconSortDown />
              )}
            </Icon>
          </button>
        </Box>
      ) : (
        children
      )}
    </Box>
  );
};

DataTableHeaderCell.displayName = "@optiaxiom/react/DataTableHeaderCell";
