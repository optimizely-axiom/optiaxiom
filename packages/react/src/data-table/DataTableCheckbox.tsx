import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useId } from "@radix-ui/react-id";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
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
  const { labelId, row, setSelector } = useDataTableRowContext(
    "@optiaxiom/react/DataTableCheckbox",
  );

  const labelPrefixId = useId();

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
    <>
      {row && (
        <VisuallyHidden id={labelPrefixId}>
          Check to {row.getIsSelected() ? "unselect" : "select"}
        </VisuallyHidden>
      )}
      <DataTableAction
        asChild
        visible={
          (visible ?? (table.getIsSomeRowsSelected() || !row))
            ? "always"
            : undefined
        }
      >
        <Checkbox
          aria-label={!row ? "Select all" : undefined}
          aria-labelledby={row && clsx(labelPrefixId, labelId)}
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
    </>
  );
});

DataTableCheckbox.displayName = "@optiaxiom/react/DataTableCheckbox";
