import { type ReactNode } from "react";

import { Box } from "../box";

export type DataTableExpandableHeaderProps = {
  children?: ReactNode;
};

/**
 * Table header component for expandable columns.
 *
 * @group DataTable
 * @experimental
 */
export function DataTableExpandableHeader({
  children,
}: DataTableExpandableHeaderProps) {
  return <Box ml="32">{children}</Box>;
}

DataTableExpandableHeader.displayName =
  "@optiaxiom/react/DataTableExpandableHeader";
