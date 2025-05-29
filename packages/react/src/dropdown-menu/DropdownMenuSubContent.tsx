import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { BoxProps } from "../box";
import type { ExcludeProps } from "../utils";

import { ModalListbox } from "../modal/internals";
import { Portal } from "../portal";
import { TransitionGroup } from "../transition";
import { useDropdownMenuSubContext } from "./DropdownMenuSubContext";

export type DropdownMenuSubContentProps = ExcludeProps<
  BoxProps<
    typeof RadixMenu.SubContent,
    Pick<ComponentPropsWithoutRef<typeof ModalListbox>, "maxH" | "minW">
  >,
  | "alignOffset"
  | "arrowPadding"
  | "avoidCollisions"
  | "collisionBoundary"
  | "collisionPadding"
  | "forceMount"
  | "hideWhenDetached"
  | "loop"
  | "sideOffset"
  | "sticky"
  | "updatePositionStrategy"
>;

export const DropdownMenuSubContent = forwardRef<
  HTMLDivElement,
  DropdownMenuSubContentProps
>(({ asChild, children, ...props }, ref) => {
  const { open, setPresence } = useDropdownMenuSubContext(
    "@optiaxiom/react/DropdownMenuSubContent",
  );

  return (
    <TransitionGroup onPresenceChange={setPresence} open={open}>
      <Portal asChild>
        <ModalListbox asChild {...props}>
          <RadixMenu.SubContent
            alignOffset={-4}
            asChild={asChild}
            ref={ref}
            sideOffset={0}
          >
            {children}
          </RadixMenu.SubContent>
        </ModalListbox>
      </Portal>
    </TransitionGroup>
  );
});

DropdownMenuSubContent.displayName = "@optiaxiom/react/DropdownMenuSubContent";
