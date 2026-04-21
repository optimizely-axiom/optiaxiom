import {
  IconArrowRightFromBracket,
  IconFilter,
  IconUser,
} from "@optiaxiom/icons";
import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";

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
      <MenuTrigger
        appearance="subtle"
        aria-label="Filters"
        icon={<IconFilter />}
      />
      <MenuContent />
    </Menu>
  );
}
