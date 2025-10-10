import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef, useState } from "react";

import { HoverCardContextProvider } from "./HoverCardContext";

export type HoverCardProps = ComponentPropsWithoutRef<
  typeof RadixHoverCard.Root
>;

export function HoverCard({
  children,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
  openDelay = 500,
  ...props
}: HoverCardProps) {
  const [open, setOpen] = useControllableState({
    caller: "@optiaxiom/react/HoverCard",
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [presence, setPresence] = useState<boolean>(false);

  return (
    <RadixHoverCard.Root
      onOpenChange={setOpen}
      open={open || presence}
      openDelay={openDelay}
      {...props}
    >
      <HoverCardContextProvider
        open={open}
        presence={presence}
        setPresence={setPresence}
      >
        {children}
      </HoverCardContextProvider>
    </RadixHoverCard.Root>
  );
}

HoverCard.displayName = "@optiaxiom/react/HoverCard";
