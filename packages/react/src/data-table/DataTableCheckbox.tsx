import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import { Checkbox } from "../checkbox";
import { DataTableAction } from "./DataTableAction";
import { useDataTableContext } from "./DataTableContext";
import { useDataTableRowContext } from "./DataTableRowContext";

export type DataTableCheckboxProps = ComponentPropsWithoutRef<typeof Checkbox> &
  Pick<ComponentPropsWithoutRef<typeof DataTableAction>, "visible">;

export const DataTableCheckbox = forwardRef<
  HTMLInputElement,
  DataTableCheckboxProps
>(({ children, disabled, visible, ...props }, outerRef) => {
  const { table } = useDataTableContext("@optiaxiom/react/DataTableCheckbox");
  const { row, setSelector } = useDataTableRowContext(
    "@optiaxiom/react/DataTableCheckbox",
  );

  const innerRef = useRef<HTMLInputElement>(null);
  const ref = useComposedRefs(innerRef, outerRef);
  useEffect(() => {
    if (!setSelector) {
      return;
    }

    if (!disabled) {
      setSelector(innerRef);
    }
    return () => setSelector(undefined);
  }, [disabled, setSelector]);

  return (
    <DataTableAction
      asChild
      visible={
        (visible ?? (table.getIsSomeRowsSelected() || !row))
          ? "always"
          : undefined
      }
    >
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
    </DataTableAction>
  );
});

DataTableCheckbox.displayName = "@optiaxiom/react/DataTableCheckbox";
