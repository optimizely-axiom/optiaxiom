import { IconFilterAlt, IconLogout, IconPerson } from "@optiaxiom/icons";
import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";

export function App() {
  return (
    <Menu
      options={[
        {
          addon: <IconPerson />,
          group: {
            label: "My Account",
          },
          label: "View Profile",
        },
        {
          addon: <IconLogout />,
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
        icon={<IconFilterAlt />}
      />
      <MenuContent />
    </Menu>
  );
}
