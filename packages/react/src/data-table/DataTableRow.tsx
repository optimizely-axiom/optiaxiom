import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useId } from "@radix-ui/react-id";
import {
  forwardRef,
  type MouseEvent,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import type { BoxProps } from "../box";

import { useEvent } from "../hooks";
import { TableRow } from "../table";
import { useDataTableContext } from "./DataTableContext";
import { DataTableRowProvider } from "./DataTableRowContext";
import { type TableAdapter, type TanStackRow } from "./tanstack";

export type DataTableRowProps = BoxProps<
  typeof TableRow,
  {
    /**
     * The row index.
     */
    index: number;
    /**
     * The Row instance to render.
     */
    row: TanStackRow;
  }
>;

export const DataTableRow = forwardRef<HTMLTableRowElement, DataTableRowProps>(
  ({ children, index, row, ...props }, outerRef) => {
    const {
      focusRequestRef,
      highlightedIndex,
      selectionBehavior,
      setHighlightedIndex,
      table,
    } = useDataTableContext("@optiaxiom/react/DataTableRow");

    const [subHighlightedIndex, setSubHighlightedIndex] = useState(-1);
    const labelId = useId();

    const [actions, setActions] = useState<
      Array<{
        primary: boolean | undefined;
        ref: RefObject<HTMLDivElement>;
      }>
    >([]);
    const primary = actions.find((action) => action.primary);
    const [selector, setSelector] = useState<RefObject<HTMLInputElement>>();

    /**
     * The table decides what a click does. In replace mode with selection on,
     * a row that can't be selected (a selection cap, an item already added)
     * ignores a single click and opens on double click, like the selectable
     * rows around it.
     */
    const selectable = table.getCanSelectRows();
    /**
     * In toggle mode a click runs the primary action, or toggles a row that
     * has none, and only the checkbox, Space and Shift + arrow keys select.
     */
    const toggle = selectable && selectionBehavior === "toggle";

    const focusManaged = Boolean(
      selector || primary || (toggle && table.getCanSelect(row)),
    );

    const innerRef = useRef<HTMLTableRowElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    /**
     * A row mounted by the virtualizer only becomes focusable once its actions
     * register, so wait for `focusManaged` before moving focus to it.
     */
    useEffect(() => {
      if (highlightedIndex !== index) {
        return;
      }

      if (focusManaged && focusRequestRef.current) {
        focusRequestRef.current = false;
        innerRef.current?.focus();
      }
      return () => setSubHighlightedIndex(-1);
    }, [focusManaged, focusRequestRef, highlightedIndex, index]);

    /**
     * Keep the highlight on the focused row when data changes move it to a new
     * index, so arrow keys and `tabIndex` follow the row.
     */
    useEffect(() => {
      if (innerRef.current?.contains(document.activeElement)) {
        setHighlightedIndex(index);
      }
    }, [index, setHighlightedIndex]);

    const onActionMount = useEvent(
      ({
        primary,
        ref,
      }: {
        primary: boolean | undefined;
        ref: RefObject<HTMLDivElement>;
      }) => {
        setActions((actions) => [...actions, { primary, ref }]);
        return () =>
          setActions((actions) =>
            actions.filter((action) => action.ref !== ref),
          );
      },
    );

    return (
      <TableRow
        aria-labelledby={labelId}
        aria-selected={
          table.getCanSelect(row) ? table.getIsSelected(row) : undefined
        }
        data-focus-visible={focusManaged ? "" : undefined}
        data-selected={table.getIsSelected(row) ? "" : undefined}
        onClick={(event) => {
          if (!(event.target instanceof Element)) {
            return;
          }

          if (isPortalClick(event)) {
            return;
          }

          if (isInteractiveElement(event)) {
            return;
          }

          // The checkbox's own label or cover toggles it.
          if (
            toggle &&
            selector &&
            getAssociatedControl(event) === selector.current
          ) {
            return;
          }

          if (!selectable || (toggle && primary)) {
            if (!primary?.ref.current?.contains(event.target)) {
              primary?.ref.current?.click();
            }
          } else if (toggle) {
            if (table.getCanSelect(row)) {
              table.toggleSelected(row);
            }
          } else if (
            table.getCanSelect(row) &&
            selector &&
            getAssociatedControl(event) !== selector.current
          ) {
            table.setRowSelection({ [row.id]: true });
          }
        }}
        onDoubleClick={(event) => {
          // Without selection or in toggle mode, a single click already ran
          // the primary action.
          if (
            !selectable ||
            toggle ||
            !primary ||
            !(event.target instanceof Element)
          ) {
            return;
          }

          if (isPortalClick(event)) {
            return;
          }

          if (isInteractiveElement(event)) {
            return;
          }

          // Don't trigger if they double-clicked the primary action itself
          if (primary.ref.current?.contains(event.target)) {
            return;
          }

          event.preventDefault();
          document.getSelection()?.empty();
          primary.ref.current?.click();
        }}
        onFocus={(event) => {
          if (focusManaged) {
            setHighlightedIndex(index);
            if (event.target === event.currentTarget) {
              setSubHighlightedIndex(-1);
            }
          }
        }}
        onKeyDown={(event) => {
          if (event.defaultPrevented) {
            return;
          }

          if (
            event.target instanceof HTMLElement &&
            event.target !== selector?.current &&
            (event.target.isContentEditable ||
              ["input", "select", "textarea"].includes(event.target.localName))
          ) {
            return;
          }

          const rows = table.getRows();
          if (
            focusManaged &&
            (event.key === "ArrowDown" || event.key === "ArrowUp")
          ) {
            const step = event.key === "ArrowDown" ? 1 : -1;
            const nextIndex = highlightedIndex + step;
            if (nextIndex >= 0 && nextIndex <= rows.length - 1) {
              event.preventDefault();
              focusRequestRef.current = true;
              setHighlightedIndex(nextIndex);

              // `setRowSelection` ignores `getCanSelect()`, so every selection
              // change below checks it.
              const nextRow = rows[nextIndex];
              if (selector || toggle) {
                if (event.shiftKey && table.getCanMultiSelect(row)) {
                  // Look past rows that can't be selected: moving toward a
                  // selected row shrinks the range from the row being left.
                  const ahead = findSelectableRow(table, rows, nextIndex, step);
                  const behind = findSelectableRow(
                    table,
                    rows,
                    highlightedIndex,
                    -step,
                  );
                  table.setRowSelection((old) => {
                    const selection = { ...old };
                    if (ahead && selection[ahead.id]) {
                      if (behind) {
                        delete selection[behind.id];
                      }
                    } else if (table.getCanSelect(nextRow)) {
                      selection[nextRow.id] = true;
                    }
                    return selection;
                  });
                } else if (!toggle) {
                  table.setRowSelection(
                    table.getCanSelect(nextRow) ? { [nextRow.id]: true } : {},
                  );
                }
              }
            }
          } else if (
            focusManaged &&
            document.activeElement === event.currentTarget &&
            event.key === "ArrowRight"
          ) {
            const nextIndex = subHighlightedIndex + 1;
            if (nextIndex <= actions.length - 1) {
              event.preventDefault();
              setSubHighlightedIndex(nextIndex);
            }
          } else if (event.currentTarget === document.activeElement) {
            if (
              event.key === " " &&
              (selector || (toggle && table.getCanSelect(row)))
            ) {
              event.preventDefault();
              table.toggleSelected(row);
            } else if (event.key === "Enter" && primary) {
              event.preventDefault();
              primary.ref.current?.click();
            }
          }
        }}
        ref={ref}
        tabIndex={
          focusManaged
            ? (highlightedIndex === -1 || highlightedIndex === index) &&
              subHighlightedIndex === -1
              ? 0
              : -1
            : undefined
        }
        {...props}
      >
        <DataTableRowProvider
          actions={actions.map(({ ref }) => ref)}
          focusManaged={focusManaged}
          highlightedIndex={subHighlightedIndex}
          labelId={labelId}
          onActionMount={onActionMount}
          row={row}
          setHighlightedIndex={useEvent((nextIndex: number) => {
            setSubHighlightedIndex(nextIndex);
            if (nextIndex === -1) {
              innerRef.current?.focus();
            }
          })}
          setSelector={setSelector}
        >
          {children}
        </DataTableRowProvider>
      </TableRow>
    );
  },
);

DataTableRow.displayName = "@optiaxiom/react/DataTableRow";

const findSelectableRow = (
  table: TableAdapter,
  rows: TanStackRow[],
  from: number,
  step: number,
) => {
  for (let i = from; i >= 0 && i < rows.length; i += step) {
    if (table.getCanSelect(rows[i])) {
      return rows[i];
    }
  }
  return;
};

const getAssociatedControl = (event: MouseEvent) => {
  if (event.target instanceof Element) {
    const label = event.target.closest("label");
    if (label && event.currentTarget.contains(label) && label.control) {
      return label.control;
    }
  }
  return;
};

// Interactive element check: don't trigger row action if user clicked
// on a button, link, input, etc. (or their children like icons/text)
const isInteractiveElement = (event: MouseEvent) => {
  if (!(event.target instanceof Element)) {
    return false;
  }

  const interactive = event.target.closest(
    'a, button, input, select, textarea, [contenteditable="true"], [role="button"], [role="link"]',
  );

  return interactive && interactive !== event.currentTarget;
};

// Portal check: if click target isn't in the row DOM tree, ignore it
// This handles clicks in menus, popovers, etc. that are portalled outside
const isPortalClick = (event: MouseEvent) => {
  return (
    event.target instanceof Element &&
    !event.currentTarget.contains(event.target)
  );
};
