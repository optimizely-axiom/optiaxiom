import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import {
  forwardRef,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
  useRef,
  useState,
} from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { SortableProvider } from "./SortableContext";

export type SortableProps<T extends Items> = BoxProps<
  "div",
  {
    children?: (items: T) => ReactNode;
    /**
     * An array of item IDs in controlled mode.
     */
    items: T;
    /**
     * Event handler that is called when items are re-sorted with full information about the event.
     */
    onChange?: (data: {
      /**
       * The re-sorted item IDs.
       */
      items: T;
      /**
       * ID of the item that was being dragged.
       */
      source: string;
    }) => void;
    /**
     * Handler that is called when the item IDs are re-sorted.
     */
    onItemsChange?: (value: T) => void;
  }
>;

type Items = Record<string, string[]> | string[];

export const Sortable = forwardRef<HTMLDivElement, SortableProps<Items>>(
  ({ children, items: itemsProp, onChange, onItemsChange, ...props }, ref) => {
    const [itemsState, setItemsState] = useState<Items | null>(null);
    const items = itemsState === null ? (itemsProp ?? []) : itemsState;
    const cacheRef = useRef(new Map());

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
        onDragStart={() => {
          setItemsState(itemsProp ?? []);
        }}
      >
        <SortableProvider cacheRef={cacheRef} isSorting={itemsState !== null}>
          <Flex ref={ref} {...props}>
            {children?.(items)}
          </Flex>
        </SortableProvider>
      </DragDropProvider>
    );
  },
) as (<T extends Items>(
  props: RefAttributes<HTMLDivElement> & SortableProps<T>,
) => null | ReactElement) & { displayName: string };

Sortable.displayName = "@optiaxiom/react/Sortable";
