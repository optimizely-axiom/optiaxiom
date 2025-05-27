import { type ComponentPropsWithoutRef, forwardRef, useEffect } from "react";

import { Checkbox } from "../checkbox";
import { useDataTableContext } from "./DataTableContext";
import { useDataTableRowContext } from "./DataTableRowContext";

export type DataTableCheckboxProps = ComponentPropsWithoutRef<typeof Checkbox>;

export const DataTableCheckbox = forwardRef<
  HTMLInputElement,
  DataTableCheckboxProps
>(({ children, disabled, ...props }, ref) => {
  const { table } = useDataTableContext("@optiaxiom/react/DataTableCheckbox");
  const { row, setSelectionMode } = useDataTableRowContext(
    "@optiaxiom/react/DataTableCheckbox",
  );

  useEffect(() => {
    if (!setSelectionMode) {
      return;
    }

    if (!disabled) {
      setSelectionMode("single");
    }
    return () => setSelectionMode(false);
  }, [disabled, setSelectionMode]);

  return (
    <Checkbox
      aria-label={row ? "Select row" : "Select all"}
      checked={
        row
          ? row.getIsSelected()
          : table.getIsAllPageRowsSelected() ||
            table.getIsSomePageRowsSelected()
      }
      disabled={disabled}
      indeterminate={!row && table.getIsSomePageRowsSelected()}
      onChange={
        row
          ? row.getToggleSelectedHandler()
          : table.getToggleAllPageRowsSelectedHandler()
      }
      ref={ref}
      {...props}
    >
      {children}
    </Checkbox>
  );
});

DataTableCheckbox.displayName = "@optiaxiom/react/DataTableCheckbox";
