import * as RadixRovingFocus from "@radix-ui/react-roving-focus";
import { createSlot } from "@radix-ui/react-slot";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { useRovingFocusContext } from "./RovingFocusContext";

const Slot = createSlot("@optiaxiom/react/RovingFocusItem");

export type RovingFocusItemProps = BoxProps<typeof RadixRovingFocus.Item> & {
  children?: ReactNode;
};

export const RovingFocusItem = forwardRef<HTMLDivElement, RovingFocusItemProps>(
  ({ asChild, children, ...props }, ref) => {
    const { disabled } = useRovingFocusContext(
      "@optiaxiom/react/RovingFocusItem",
    );
    const FocusComp = disabled ? Box : RadixRovingFocus.Item;
    const Comp = asChild ? Slot : "div";

    return (
      <Box asChild ref={ref} {...props}>
        <FocusComp asChild>
          <Comp>{children}</Comp>
        </FocusComp>
      </Box>
    );
  },
);

RovingFocusItem.displayName = "@optiaxiom/react/RovingFocusItem";
