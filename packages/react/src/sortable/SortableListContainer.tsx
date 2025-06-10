import { pointerIntersection } from "@dnd-kit/collision";
import { useDroppable } from "@dnd-kit/react";
import { type ComponentPropsWithoutRef, type ReactNode, useState } from "react";

import { type BoxProps } from "../box";
import { SortableListContainerProvider } from "./SortableListContainerContext";
import { useSortableListContext } from "./SortableListContext";
import { collapse, type Context } from "./utils";

export type SortableListContainerProps = BoxProps<
  "div",
  Pick<
    ComponentPropsWithoutRef<typeof SortableListContainerProvider>,
    "id" | "index" | "items"
  > & {
    children?: (item: Context) => ReactNode;
  }
>;

export function SortableListContainer({
  children,
  id,
  index,
  items,
}: SortableListContainerProps) {
  const { id: parent } = useSortableListContext(
    "@optiaxiom/react/SortableListContainer",
  );
  if (typeof items === "string") {
    throw new Error(
      `\`@optiaxiom/react/SortableItem\` must be used instead of \`@optiaxiom/react/SortableList\``,
    );
  }

  const [hasDropTarget, setHasDropTarget] = useState(false);
  const { isDropTarget, ref } = useDroppable({
    accept: "item",
    collisionDetector: pointerIntersection,
    collisionPriority: 1,
    id: parent ? `${parent}:${id}` : id,
    type: "list",
  });

  return (
    <SortableListContainerProvider
      elementRef={ref}
      id={id}
      index={index}
      isDropTarget={isDropTarget}
      items={items}
      setHasDropTarget={setHasDropTarget}
    >
      {children?.({
        count: Object.keys(collapse(items)).length,
        id,
        index,
        isDropTarget: isDropTarget || hasDropTarget,
      })}
    </SortableListContainerProvider>
  );
}

SortableListContainer.displayName = "@optiaxiom/react/SortableListContainer";
