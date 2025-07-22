import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";
import { IconFilter, IconLogout, IconUser } from "@tabler/icons-react";

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
        icon={<IconFilter />}
      />
      <MenuContent />
    </Menu>
  );
}
