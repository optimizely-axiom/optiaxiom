import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import { Command } from "../command";
import { Dialog } from "../dialog";
import { SpotlightProvider } from "../spotlight-context";

type SpotlightProps<Item> = ComponentPropsWithoutRef<typeof Command<Item>> & {
  children: ReactNode;
  defaultOpen?: boolean;
  onInputValueChange?: (inputValue: string) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
};

export function Spotlight<Item>({
  children,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
  ...props
}: SpotlightProps<Item>) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <SpotlightProvider open={open} setOpen={setOpen}>
        <Command {...props}>{children}</Command>
      </SpotlightProvider>
    </Dialog>
  );
}

Spotlight.displayName = "@optiaxiom/react/Spotlight";
