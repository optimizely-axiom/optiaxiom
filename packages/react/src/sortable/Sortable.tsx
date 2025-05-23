import { move } from "@dnd-kit/helpers";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { forwardRef, type ReactNode, useState } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Portal } from "../portal";
import * as styles from "./Sortable.css";
import { SortableProvider } from "./SortableContext";

export type SortableProps = BoxProps<
  "div",
  {
    children?: (item: string, index: number) => ReactNode;
    /**
     * An array of item IDs in controlled mode.
     */
    items: string[];
    /**
     * Event handler that is called when items are re-sorted with full information about the event.
     */
    onChange?: (data: {
      /**
       * The re-sorted item IDs.
       */
      items: string[];
      /**
       * ID of the item that was being dragged.
       */
      source: string;
    }) => void;
    /**
     * Handler that is called when the item IDs are re-sorted.
     */
    onItemsChange?: (value: string[]) => void;
  }
>;

export const Sortable = forwardRef<HTMLDivElement, SortableProps>(
  ({ children, items: itemsProp, onChange, onItemsChange, ...props }, ref) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [itemsState, setItemsState] = useState<null | string[]>(null);
    const items = itemsState === null ? (itemsProp ?? []) : itemsState;

    return (
      <DragDropProvider
        onDragEnd={(event) => {
          const { source } = event.operation;
          if (!source || itemsState === null) {
            return;
          }

          if (!event.canceled) {
            onChange?.({
              items: itemsState,
              source: source.id.toString(),
            });
            onItemsChange?.(itemsState);
          }
          setItemsState(null);
        }}
        onDragOver={(event) => {
          const { source } = event.operation;
          if (!source || itemsState === null) {
            return;
          }

          setItemsState(move(itemsState, event));
        }}
        onDragStart={(event) => {
          setShowOverlay(event.nativeEvent instanceof PointerEvent);
          setItemsState(itemsProp ?? []);
        }}
      >
        <Flex ref={ref} {...props}>
          {typeof children === "function"
            ? items.map((item, index) => (
                <SortableProvider
                  index={index}
                  isSorting={itemsState !== null}
                  item={item}
                  key={item}
                >
                  {children(item, index)}
                </SortableProvider>
              ))
            : children}
        </Flex>

        <Portal asChild {...styles.overlay()}>
          <DragOverlay>
            {showOverlay && <Box bg="bg.overlay" rounded="sm" size="full" />}
          </DragOverlay>
        </Portal>
      </DragDropProvider>
    );
  },
);

Sortable.displayName = "@optiaxiom/react/Sortable";
