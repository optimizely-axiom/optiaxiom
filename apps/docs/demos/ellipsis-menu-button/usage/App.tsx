import { IconArrowRightFromBracket, IconUser } from "@optiaxiom/icons";
import {
  EllipsisMenuButton,
  Menu,
  MenuContent,
  MenuTrigger,
} from "@optiaxiom/react";

export function App() {
  return (
    <Menu
      options={[
        {
          addon: <IconUser />,
          label: "View profile",
        },
        {
          addon: <IconArrowRightFromBracket />,
          label: "Logout",
        },
      ]}
    >
      <MenuTrigger asChild>
        <EllipsisMenuButton appearance="subtle" aria-label="My account" />
      </MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
