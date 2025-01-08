import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { BoxProps } from "../box";
import type { ExcludeProps } from "../utils";

import { useDropdownMenuSubContext } from "../dropdown-menu-sub-context";
import { MenuListbox } from "../menu-listbox";
import { TransitionGroup } from "../transition-group";

type MenuSubContentProps = ExcludeProps<
  BoxProps<
    typeof RadixMenu.SubContent,
    Pick<ComponentPropsWithoutRef<typeof MenuListbox>, "maxH" | "minW">
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
>(({ children, ...props }, ref) => {
  const { open } = useDropdownMenuSubContext("DropdownMenuSubContent");

  return (
    <TransitionGroup open={open}>
      <RadixMenu.Portal forceMount>
        <MenuListbox asChild provider="dropdown-menu" {...props}>
          <RadixMenu.SubContent alignOffset={-4} ref={ref} sideOffset={0}>
            {children}
          </RadixMenu.SubContent>
        </MenuListbox>
      </RadixMenu.Portal>
    </TransitionGroup>
  );
});

DropdownMenuSubContent.displayName = "@optiaxiom/react/DropdownMenuSubContent";
