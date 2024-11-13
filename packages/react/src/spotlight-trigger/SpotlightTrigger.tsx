import { useHotkeys } from "@mantine/hooks";
import { forwardRef } from "react";

import type { ButtonProps } from "../button";

import { Box } from "../box";
import { DialogTrigger } from "../dialog-trigger";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { useSpotlightContext } from "../spotlight-context";
import { fallbackSpan } from "../utils";

type SpotlightTriggerProps = ButtonProps<
  typeof DialogTrigger,
  {
    hotkey?: string;
  }
>;

const DEFAULT_HOTKEY = "mod+K";

export const SpotlightTrigger = forwardRef<
  HTMLButtonElement,
  SpotlightTriggerProps
>(({ addonAfter, children, hotkey = DEFAULT_HOTKEY, ...props }, ref) => {
  const { open, setOpen } = useSpotlightContext("SpotlightTrigger");

  useHotkeys([[hotkey, () => setOpen(!open)]]);

  return (
    <DialogTrigger
      addonAfter={
        <Box asChild ml="auto">
          {fallbackSpan(addonAfter)}
        </Box>
      }
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
