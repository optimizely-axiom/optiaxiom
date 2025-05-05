import { useHotkeys } from "@mantine/hooks";
import { forwardRef } from "react";

import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { MenuTrigger } from "../menu";
import { useMenuContext } from "../menu/internals";

export type SpotlightTriggerProps = ButtonProps<
  typeof MenuTrigger,
  {
    hotkey?: string;
  }
>;

const DEFAULT_HOTKEY = "mod+K";

export const SpotlightTrigger = forwardRef<
  HTMLButtonElement,
  SpotlightTriggerProps
>(({ children, hotkey = DEFAULT_HOTKEY, ...props }, ref) => {
  const { open, setOpen } = useMenuContext("@optiaxiom/react/SpotlightTrigger");

  useHotkeys([[hotkey, () => setOpen(!open)]]);

  return (
    <MenuTrigger asChild ref={ref} {...props}>
      <Button icon={<IconMagnifyingGlass />}>
        <Box color="fg.tertiary">{children}</Box>
      </Button>
    </MenuTrigger>
  );
});

SpotlightTrigger.displayName = "@optiaxiom/react/SpotlightTrigger";
