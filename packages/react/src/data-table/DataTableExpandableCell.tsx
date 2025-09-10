import type { CellContext } from "@tanstack/table-core";

import { useId } from "@radix-ui/react-id";
import clsx from "clsx";
import { type ReactNode } from "react";

import { Box } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconAngleDown } from "../icons/IconAngleDown";
import { IconAngleRight } from "../icons/IconAngleRight";
import { useDataTableRowContext } from "./DataTableRowContext";

export type DataTableExpandableCellProps<TData, TValue> = CellContext<
  TData,
  TValue
> & {
  children?: ReactNode;
};

export function DataTableExpandableCell<TData, TValue>({
  children,
  getValue,
  row,
}: DataTableExpandableCellProps<TData, TValue>) {
  const labelPrefixId = useId();
  const { labelId } = useDataTableRowContext(
    "@optiaxiom/react/DataTableExpandableCell",
  );
  return (
    <Flex flexDirection="row" gap="8">
      {Array.from({ length: row.depth }).map((_, index) => (
        <Box key={index} w="sm" />
      ))}
      {row.getCanExpand() ? (
        <Button
          appearance="subtle"
          aria-expanded={row.getIsExpanded()}
          aria-label="Toggle row"
          aria-labelledby={clsx(labelPrefixId, labelId)}
          icon={row.getIsExpanded() ? <IconAngleDown /> : <IconAngleRight />}
          id={labelPrefixId}
          onClick={row.getToggleExpandedHandler()}
          size="sm"
          style={{ marginBlock: -2 }}
          type="button"
        />
      ) : (
        <Box w="sm" />
      )}
      {children ?? (getValue() as string)}
    </Flex>
  );
}

DataTableExpandableCell.displayName =
  "@optiaxiom/react/DataTableExpandableCell";
