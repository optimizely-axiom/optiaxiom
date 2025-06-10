import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, type ReactNode } from "react";

import type { Context } from "./utils";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { SortableItemContainer } from "./SortableItemContainer";
import { useSortableItemContainerContext } from "./SortableItemContainerContext";
import { SortableListContainer } from "./SortableListContainer";
import { useSortableListContainerContext } from "./SortableListContainerContext";
import {
  SortableListProvider,
  useSortableListContext,
} from "./SortableListContext";

export type SortableListProps = BoxProps<
  "div",
  {
    children?: (item: Context) => ReactNode;
  }
>;

export const SortableList = forwardRef<HTMLDivElement, SortableListProps>(
  ({ children, ...props }, outerRef) => {
    const { id: parent } = useSortableListContext(
      "@optiaxiom/react/SortableList",
    );
    const { elementRef, id, items, setHasDropTarget } =
      useSortableListContainerContext("@optiaxiom/react/SortableList");
    const { id: itemId } = useSortableItemContainerContext(
      "@optiaxiom/react/SortableList",
    );
    if (itemId) {
      throw new Error(
        `\`@optiaxiom/react/SortableItem\` must be used instead of \`@optiaxiom/react/SortableList\``,
      );
    }

    const ref = useComposedRefs(
      Array.isArray(items) ? elementRef : undefined,
      outerRef,
    );

    return (
      <SortableListProvider
        id={parent ? `${parent}:${id}` : id}
        setHasDropTarget={setHasDropTarget}
      >
        <Flex justifyContent="flex-start" ref={ref} {...props}>
          {typeof children === "function"
            ? Array.isArray(items)
              ? items.map((item, index) => (
                  <SortableItemContainer id={item} index={index} key={item}>
                    {children}
                  </SortableItemContainer>
                ))
              : Object.entries(items).map(([group, items], index) => (
                  <SortableListContainer
                    id={group}
                    index={index}
                    items={items}
                    key={group}
                  >
                    {children}
                  </SortableListContainer>
                ))
            : children}
        </Flex>
      </SortableListProvider>
    );
  },
);

SortableList.displayName = "@optiaxiom/react/SortableList";
