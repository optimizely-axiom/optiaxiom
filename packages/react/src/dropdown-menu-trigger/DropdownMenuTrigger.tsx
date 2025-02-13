import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { AngleMenuButton } from "../angle-menu-button";
import { Button } from "../button";
import { useDropdownMenuContext } from "../dropdown-menu-context";

type MenuTriggerProps = ComponentPropsWithoutRef<typeof Button>;

export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  MenuTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { presence } = useDropdownMenuContext("DropdownMenuTrigger");

  return (
    <RadixMenu.Trigger
      asChild
      data-expanded={presence ? "" : undefined}
      ref={ref}
      {...props}
    >
      {asChild ? children : <AngleMenuButton>{children}</AngleMenuButton>}
    </RadixMenu.Trigger>
  );
});

DropdownMenuTrigger.displayName = "@optiaxiom/react/DropdownMenuTrigger";
