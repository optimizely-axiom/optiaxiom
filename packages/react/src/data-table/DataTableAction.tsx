import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useEffect, useRef } from "react";

import { type BoxProps } from "../box";
import { TableAction } from "../table";
import { useDataTableRowContext } from "./DataTableRowContext";

export type DataTableActionProps = BoxProps<
  typeof TableAction,
  {
    /**
     * Whether this is the primary action within the row.
     */
    primary?: boolean;
  }
>;

export const DataTableAction = forwardRef<HTMLDivElement, DataTableActionProps>(
  ({ onKeyDown, onPointerDown, primary, visible, ...props }, outerRef) => {
    const {
      actions,
      focusManaged,
      highlightedIndex,
      onActionMount,
      setHighlightedIndex,
    } = useDataTableRowContext("@optiaxiom/react/DataTableAction");

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    useEffect(() => {
      if (!onActionMount) {
        return;
      }

      return onActionMount({ primary, ref: innerRef });
    }, [onActionMount, primary]);
    const index = actions.includes(innerRef)
      ? actions.indexOf(innerRef)
      : undefined;
    useEffect(() => {
      if (highlightedIndex === index) {
        innerRef.current?.focus();
      }
    }, [highlightedIndex, index]);

    return (
      <TableAction
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) {
            return;
          }

          if (
            event.target instanceof HTMLElement &&
            event.target !== innerRef?.current &&
            (event.target.isContentEditable ||
              ["input", "select", "textarea"].includes(event.target.localName))
          ) {
            return;
          }

          if (
            focusManaged &&
            (event.key === "ArrowRight" || event.key === "ArrowLeft")
          ) {
            const nextIndex =
              event.key === "ArrowRight"
                ? highlightedIndex + 1
                : highlightedIndex - 1;
            if (nextIndex >= -1 && nextIndex <= actions.length - 1) {
              event.preventDefault();
              setHighlightedIndex?.(nextIndex);
            }
          }
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (event.defaultPrevented || !index) {
            return;
          }

          setHighlightedIndex?.(index);
        }}
        ref={ref}
        tabIndex={
          focusManaged ? (highlightedIndex === index ? 0 : -1) : undefined
        }
        visible={visible ?? (primary ? "always" : undefined)}
        {...props}
      />
    );
  },
);

DataTableAction.displayName = "@optiaxiom/react/DataTableAction";
