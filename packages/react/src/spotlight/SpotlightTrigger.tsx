import { useHotkeys } from "@mantine/hooks";
import { IconSearch } from "@optiaxiom/icons/IconSearch";
import { forwardRef } from "react";

import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { MenuTrigger } from "../menu";
import { useMenuContext } from "../menu/internals";

export type SpotlightTriggerProps = ButtonProps<typeof MenuTrigger>;

const DEFAULT_HOTKEY = "mod+K";

/**
 * Search button that opens the Spotlight, also with Cmd/Ctrl+K.
 *
 * Leave out `children` for an icon-only button, and give it an `aria-label`.
 * To show a full search button on larger screens and only the icon on small
 * ones, render one of each with responsive `display`. Every trigger binds the
 * shortcut, which still opens the Spotlight once.
 *
 * @example
 * <SpotlightTrigger aria-label="Search" display={["flex", "none"]} />
 * <SpotlightTrigger display={["none", "flex"]}>Search</SpotlightTrigger>
 *
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
        {children && <Box color="fg.tertiary">{children}</Box>}
      </Button>
    </MenuTrigger>
  );
});

SpotlightTrigger.displayName = "@optiaxiom/react/SpotlightTrigger";
