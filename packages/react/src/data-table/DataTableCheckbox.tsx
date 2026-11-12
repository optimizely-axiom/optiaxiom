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
import { useMessages } from "../locale";
import { DataTableAction } from "./DataTableAction";
import { useDataTableContext } from "./DataTableContext";
import { useDataTableRowContext } from "./DataTableRowContext";

export type DataTableCheckboxProps = ComponentPropsWithoutRef<typeof Checkbox> &
  Pick<ComponentPropsWithoutRef<typeof DataTableAction>, "visible">;

/**
 * Selects its row, or every row on the page when rendered in a header.
 *
 * When the checkbox is the only content of its cell, wrap it in
 * `<Cover asChild>` so the whole cell toggles selection. Otherwise a click on
 * the cell's padding selects only this row and clears the rest.
 *
 * A row checkbox takes its accessible name from the row's `DataTableLabel`,
 * after the default "Check to select" or "Check to unselect" message, and that
 * name overrides an `aria-label`. Put `DataTableLabel` in the row's primary
 * cell, or pass `aria-labelledby` to name it from another element. The header
 * checkbox defaults to "Select all".
 *
 * @group DataTable
 */
export const DataTableCheckbox = forwardRef<
  HTMLInputElement,
  DataTableCheckboxProps
>(({ children, disabled, visible, ...props }, outerRef) => {
  const { table } = useDataTableContext("@optiaxiom/react/DataTableCheckbox");
  const { labelId, row, setSelector } = useDataTableRowContext(
    "@optiaxiom/react/DataTableCheckbox",
  );

  const labelPrefixId = useId();
  const messages = useMessages();

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
          {row.getIsSelected()
            ? messages["Check to unselect"]
            : messages["Check to select"]}
        </VisuallyHidden>
      )}
      <DataTableAction
        visible={
          (visible ?? (table.getIsSomeRowsSelected() || !row))
            ? "always"
            : undefined
        }
      >
        <Checkbox
          aria-label={!row ? messages["Select all"] : undefined}
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
