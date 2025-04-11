import { useHotkeys } from "@mantine/hooks";
import { forwardRef } from "react";

import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { DialogTrigger } from "../dialog-trigger";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { useMenuContext } from "../menu-context";
import { MenuTrigger } from "../menu-trigger";

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
