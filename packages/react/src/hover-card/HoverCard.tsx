import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { type BoxProps } from "../box";
import { HoverCardContext } from "../hover-card-context";

type HoverCardProps = BoxProps<typeof RadixHoverCard.Root>;

export const HoverCard = ({
  children,
  defaultOpen,
  onOpenChange,
  open: openProp,
  openDelay = 500,
  ...props
}: HoverCardProps) => {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixHoverCard.Root
      onOpenChange={setOpen}
      open={open}
      openDelay={openDelay}
      {...props}
    >
      <HoverCardContext.Provider value={{ open }}>
        {children}
      </HoverCardContext.Provider>
    </RadixHoverCard.Root>
  );
};

HoverCard.displayName = "@optiaxiom/react/HoverCard";
