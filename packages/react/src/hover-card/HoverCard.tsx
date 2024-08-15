import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { type BoxProps } from "../box";
import { HoverCardContextProvider } from "../hover-card-context";

type HoverCardProps = BoxProps<
  typeof RadixHoverCard.Root,
  {
    keepOpenOnActivation?: boolean;
  }
>;

export const HoverCard = ({
  children,
  defaultOpen,
  keepOpenOnActivation,
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
      <HoverCardContextProvider
        keepOpenOnActivation={keepOpenOnActivation}
        open={open}
        setOpen={setOpen}
      >
        {children}
      </HoverCardContextProvider>
    </RadixHoverCard.Root>
  );
};

HoverCard.displayName = "@optiaxiom/react/HoverCard";
