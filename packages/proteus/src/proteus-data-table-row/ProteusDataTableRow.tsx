import { get } from "jsonpointer";

import { useProteusDataTableRowContext } from "../proteus-document/ProteusDataTableRowContext";

export type ProteusDataTableRowProps = {
  /**
   * JSON pointer path to a field within the current row (e.g. `type` or
   * `/type`). When omitted, resolves to the whole row object.
   */
  path?: string;
};

export function ProteusDataTableRow({ path }: ProteusDataTableRowProps) {
  const { row } = useProteusDataTableRowContext(
    "@optiaxiom/proteus/ProteusDataTableRow",
  );
  const value = getDataTableRowValue(row, path);
  return value == null || typeof value === "object" ? null : String(value);
}

ProteusDataTableRow.displayName = "@optiaxiom/proteus/ProteusDataTableRow";

/**
 * Reads a value out of a `DataTable` row for the `DataTableRow` element and
 * expression. With no `path`, returns the whole row; otherwise reads the field
 * at `path` (leading `/` optional).
 */
export function getDataTableRowValue(
  row: Record<string, unknown> | undefined,
  path?: string,
): unknown {
  if (!row) {
    return undefined;
  }
  if (!path) {
    return row;
  }
  try {
    return get(row, path.startsWith("/") ? path : `/${path}`);
  } catch {
    return undefined;
  }
}
