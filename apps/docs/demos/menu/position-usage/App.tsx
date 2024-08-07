import type { ComponentPropsWithRef } from "react";

import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from "@optiaxiom/react";
import { IconLogout, IconUser } from "@tabler/icons-react";

export function App({
  align,
  side,
}: Pick<ComponentPropsWithRef<typeof MenuContent>, "align" | "side">) {
  return (
    <Menu>
      <MenuTrigger>Open</MenuTrigger>

      <MenuContent align={align} side={side}>
        <MenuLabel>My Account</MenuLabel>
        <MenuItem startDecorator={<IconUser />}>View Profile</MenuItem>
        <MenuSeparator />
        <MenuItem startDecorator={<IconLogout />}>Logout</MenuItem>
      </MenuContent>
    </Menu>
  );
}
