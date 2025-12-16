import * as RadixRovingFocus from "@radix-ui/react-roving-focus";
import { createSlot } from "@radix-ui/react-slot";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { RovingFocusProvider } from "./RovingFocusContext";

const Slot = createSlot("@optiaxiom/react/RovingFocus");

export type RovingFocusProps = BoxProps<typeof RadixRovingFocus.Root> & {
  children?: ReactNode;
  /**
   * When true, roving focus behavior is disabled and children are rendered
   * directly without focus management.
   */
  disabled?: boolean;
};

export const RovingFocus = forwardRef<HTMLDivElement, RovingFocusProps>(
  ({ asChild, children, disabled, loop, orientation, ...props }, ref) => {
    const FocusComp = disabled ? Box : RadixRovingFocus.Root;
    const Comp = asChild ? Slot : "div";

    return (
      <RovingFocusProvider disabled={disabled}>
        <Box asChild ref={ref} {...props}>
          <FocusComp asChild {...(!disabled && { loop, orientation })}>
            <Comp>{children}</Comp>
          </FocusComp>
        </Box>
      </RovingFocusProvider>
    );
  },
);

RovingFocus.displayName = "@optiaxiom/react/RovingFocus";
