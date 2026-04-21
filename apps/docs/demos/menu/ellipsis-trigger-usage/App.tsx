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
          group: {
            label: "My Account",
          },
          label: "View Profile",
        },
        {
          addon: <IconArrowRightFromBracket />,
          group: {
            hidden: true,
            label: "Logout",
            separator: true,
          },
          label: "Logout",
        },
      ]}
    >
      <MenuTrigger asChild>
        <EllipsisMenuButton appearance="subtle" aria-label="My Account" />
      </MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
