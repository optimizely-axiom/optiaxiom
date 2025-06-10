import { pointerIntersection } from "@dnd-kit/collision";
import { useSortable } from "@dnd-kit/react/sortable";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

import type { Context } from "./utils";

import { type BoxProps } from "../box";
import { SortableItemContainerProvider } from "./SortableItemContainerContext";
import { useSortableListContext } from "./SortableListContext";

export type SortableItemContainerProps = BoxProps<
  "div",
  Pick<
    ComponentPropsWithoutRef<typeof SortableItemContainerProvider>,
    "id" | "index"
  > & {
    children?: (item: Context) => ReactNode;
  }
>;

export function SortableItemContainer({
  children,
  id,
  index,
}: SortableItemContainerProps) {
  const { id: group, setHasDropTarget } = useSortableListContext(
    "@optiaxiom/react/SortableItemContainer",
  );

  const handleRef = useRef<HTMLDivElement>(null);
  const { isDragging, isDropTarget, ref } = useSortable({
    accept: "item",
    collisionDetector: pointerIntersection,
    feedback: "clone",
    group,
    handle: handleRef,
    id,
    index,
    type: "item",
  });
  useEffect(() => {
    if (!isDropTarget) {
      return;
    }

    setHasDropTarget(true);
    return () => setHasDropTarget(false);
  }, [setHasDropTarget, id, isDropTarget]);

  return (
    <SortableItemContainerProvider
      elementRef={ref}
      handleRef={handleRef}
      id={id}
      index={index}
      isDragging={isDragging}
    >
      {children?.({
        count: 1,
        id,
        index,
        isDropTarget,
      })}
    </SortableItemContainerProvider>
  );
}

SortableItemContainer.displayName = "@optiaxiom/react/SortableItemContainer";
