import { forwardRef, useEffect } from "react";

import type { ButtonProps } from "../button";

import { Box } from "../box";
import { DialogTrigger } from "../dialog-trigger";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { useSpotlightContext } from "../spotlight-context";

type SpotlightTriggerProps = ButtonProps<
  typeof DialogTrigger,
  {
    hotkey?: string[];
  }
>;

const DEFAULT_HOTKEY = ["metaKey", "KeyK"];

export const SpotlightTrigger = forwardRef<
  HTMLButtonElement,
  SpotlightTriggerProps
>(({ addonAfter, children, hotkey = DEFAULT_HOTKEY, ...props }, ref) => {
  const { open, setOpen } = useSpotlightContext("SpotlightTrigger");

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      const isHotkeyPressed =
        hotkey.length !== 0 &&
        hotkey.every(
          (key) => event[key as keyof typeof event] || event.code === key,
        );
      if (isHotkeyPressed) {
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [hotkey, open, setOpen]);

  return (
    <DialogTrigger
      addonAfter={<Box ml="auto">{addonAfter}</Box>}
      icon={<IconMagnifyingGlass />}
      justifyContent="start"
      ref={ref}
      {...props}
    >
      <Box color="fg.tertiary">{children}</Box>
    </DialogTrigger>
  );
});

SpotlightTrigger.displayName = "@optiaxiom/react/SpotlightTrigger";
