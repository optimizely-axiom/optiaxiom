import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { BoxProps } from "../box";
import type { ExcludeProps } from "../utils";

import { useDropdownMenuSubContext } from "../dropdown-menu-sub-context";
import { OverlayListbox } from "../overlay-listbox";
import { TransitionGroup } from "../transition-group";

type MenuSubContentProps = ExcludeProps<
  BoxProps<
    typeof RadixMenu.SubContent,
    Pick<ComponentPropsWithoutRef<typeof OverlayListbox>, "maxH" | "minW">
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
  MenuSubContentProps
>(({ asChild, children, ...props }, ref) => {
  const { open, setPresence } = useDropdownMenuSubContext(
    "@optiaxiom/react/DropdownMenuSubContent",
  );

  return (
    <TransitionGroup onPresenceChange={setPresence} open={open}>
      <RadixMenu.Portal forceMount>
        <OverlayListbox
          asChild
          minW="trigger"
          provider="dropdown-menu"
          {...props}
        >
          <RadixMenu.SubContent
            alignOffset={-4}
            asChild={asChild}
            ref={ref}
            sideOffset={0}
          >
            {children}
          </RadixMenu.SubContent>
        </OverlayListbox>
      </RadixMenu.Portal>
    </TransitionGroup>
  );
});

DropdownMenuSubContent.displayName = "@optiaxiom/react/DropdownMenuSubContent";
