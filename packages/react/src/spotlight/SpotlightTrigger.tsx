import { useHotkeys } from "@mantine/hooks";
import { IconSearch } from "@optiaxiom/icons";
import { forwardRef } from "react";

import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { MenuTrigger } from "../menu";
import { useMenuContext } from "../menu/internals";

export type SpotlightTriggerProps = ButtonProps<typeof MenuTrigger>;

const DEFAULT_HOTKEY = "mod+K";

/**
 * @group Spotlight
 */
export const SpotlightTrigger = forwardRef<
  HTMLButtonElement,
  SpotlightTriggerProps
>(({ children, ...props }, ref) => {
  const { open, setOpen } = useMenuContext("@optiaxiom/react/SpotlightTrigger");

  useHotkeys([[DEFAULT_HOTKEY, () => setOpen(!open)]]);

  return (
    <MenuTrigger asChild ref={ref} {...props}>
      <Button icon={<IconSearch />}>
        <Box color="fg.tertiary">{children}</Box>
      </Button>
    </MenuTrigger>
  );
});

SpotlightTrigger.displayName = "@optiaxiom/react/SpotlightTrigger";
