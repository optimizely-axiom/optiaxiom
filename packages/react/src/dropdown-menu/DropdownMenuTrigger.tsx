import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { AngleMenuButton } from "../angle-menu-button";
import { Button } from "../button";
import { useDropdownMenuContext } from "./DropdownMenuContext";

export type DropdownMenuTriggerProps = ComponentPropsWithoutRef<typeof Button>;

export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { open, presence } = useDropdownMenuContext(
    "@optiaxiom/react/DropdownMenuTrigger",
  );

  return (
    <RadixMenu.Trigger
      aria-expanded={open || presence}
      asChild
      data-state={open || presence ? "open" : "closed"}
      ref={ref}
      {...props}
    >
      {asChild ? children : <AngleMenuButton>{children}</AngleMenuButton>}
    </RadixMenu.Trigger>
  );
});

DropdownMenuTrigger.displayName = "@optiaxiom/react/DropdownMenuTrigger";
