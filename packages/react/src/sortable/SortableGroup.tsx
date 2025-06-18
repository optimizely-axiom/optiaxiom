import { useDroppable } from "@dnd-kit/react";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, type ReactNode, useState } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { SortableGroupProvider } from "./SortableGroupContext";

export type SortableGroupProps = BoxProps<
  "div",
  {
    children?: ((isDropTarget: boolean) => ReactNode) | ReactNode;
    /**
     * ID of the group that is being rendered.
     */
    group: string;
    /**
     * Array index of the group that is being rendered.
     */
    index: number;
  }
>;

export const SortableGroup = forwardRef<HTMLDivElement, SortableGroupProps>(
  ({ children, group: id, ...props }, outerRef) => {
    const [hasDropTarget, setHasDropTarget] = useState(false);
    const { isDropTarget, ref: innerRef } = useDroppable({
      accept: "item",
      collisionPriority: 1,
      id,
      type: "group",
    });
    const ref = useComposedRefs(innerRef, outerRef);

    return (
      <SortableGroupProvider id={id} setHasDropTarget={setHasDropTarget}>
        <Flex ref={ref} {...props}>
          {typeof children === "function"
            ? children(isDropTarget || hasDropTarget)
            : children}
        </Flex>
      </SortableGroupProvider>
    );
  },
);

SortableGroup.displayName = "@optiaxiom/react/SortableGroup";
