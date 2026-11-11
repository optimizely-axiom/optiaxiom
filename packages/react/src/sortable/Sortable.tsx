import {
  Accessibility,
  defaultPreset,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/dom";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import {
  forwardRef,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
  useRef,
  useState,
} from "react";

import { type BoxProps } from "../box";
import { Group } from "../group";
import { useMessages } from "../locale";
import { SortableProvider } from "./SortableContext";
import { type SortableItemProps } from "./SortableItem";

export type SortableProps<T extends Items> = BoxProps<
  "div",
  {
    children?: (items: T) => ReactNode;
    /**
     * The items in controlled mode: IDs, or objects whose `label` names the
     * item in screen reader announcements.
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

// Not a mixed list: dnd-kit's `move()` takes either IDs or `{ id }` objects.
type Items = List | Record<string, List>;
type List = Exclude<SortableItemProps["item"], string>[] | string[];

/**
 * Basic building blocks for sortable interfaces.
 *
 * Requires React 18 or later: the underlying `@dnd-kit/react` calls React 18
 * APIs, so it throws on React 16 and 17.
 *
 * @group Sortable
 * @category actions
 * @since 1.5.0
 * @experimental
 */
export const Sortable = forwardRef<HTMLDivElement, SortableProps<Items>>(
  ({ children, items: itemsProp, onChange, onItemsChange, ...props }, ref) => {
    const [itemsState, setItemsState] = useState<Items | null>(null);
    const items = itemsState === null ? (itemsProp ?? []) : itemsState;
    const cacheRef = useRef(new Map());

    const messages = useMessages();
    const itemsRef = useRef(items);
    itemsRef.current = items;
    // Built once and kept stable: DragDropProvider re-registers plugins
    // whenever the list changes identity. Announce positions, since dnd-kit's
    // defaults name items by their id.
    const [plugins] = useState(() => {
      const count = (group: unknown) => {
        const current = itemsRef.current;
        return Array.isArray(current)
          ? current.length
          : (current[String(group)]?.length ?? 0);
      };
      const name = (entity: { data?: { label?: string }; id: unknown }) =>
        entity.data?.label ?? String(entity.id);
      return [
        ...defaultPreset.plugins,
        Accessibility.configure({
          announcements: {
            dragend: ({ canceled, operation: { source } }: DragEndEvent) => {
              if (!isSortable(source)) {
                return;
              }
              const label = name(source);
              if (canceled) {
                const position = source.initialIndex + 1;
                const total =
                  count(source.initialGroup) +
                  (source.group === source.initialGroup ? 0 : 1);
                return messages[
                  "Dragging was cancelled. {label} returned to position {position} of {count}."
                ](label, position, total);
              }
              const position = source.index + 1;
              const total = count(source.group);
              return messages[
                "{label} dropped at position {position} of {count}."
              ](label, position, total);
            },
            dragover: ({ operation: { source, target } }: DragOverEvent) => {
              if (
                !isSortable(source) ||
                !isSortable(target) ||
                source.id === target.id
              ) {
                return;
              }
              const label = name(source);
              const position = target.index + 1;
              // Fires before `onDragOver` moves the source into the target's
              // group, so count it there already.
              const total =
                count(target.group) + (source.group === target.group ? 0 : 1);
              return messages[
                "{label} moved to position {position} of {count}."
              ](label, position, total);
            },
            dragstart: ({ operation: { source } }: DragStartEvent) => {
              if (!isSortable(source)) {
                return;
              }
              const label = name(source);
              const position = source.index + 1;
              const total = count(source.group);
              return messages["Picked up {label}, item {position} of {count}."](
                label,
                position,
                total,
              );
            },
          },
          screenReaderInstructions: {
            draggable:
              messages[
                "To pick up a draggable item, press the space bar. While dragging, use the arrow keys to move the item in a given direction. Press space again to drop the item in its new position, or press escape to cancel."
              ],
          },
        }),
      ];
    });

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
        plugins={plugins}
      >
        <SortableProvider cacheRef={cacheRef} isSorting={itemsState !== null}>
          <Group flexDirection="column" gap="16" {...props} ref={ref}>
            {children?.(items)}
          </Group>
        </SortableProvider>
      </DragDropProvider>
    );
  },
) as (<T extends Items>(
  props: RefAttributes<HTMLDivElement> & SortableProps<T>,
) => null | ReactElement) & { displayName: string };

Sortable.displayName = "@optiaxiom/react/Sortable";
