import { EllipsisMenuButton } from "@optiaxiom/react";
import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react/unstable";
import { IconLogout, IconUser } from "@tabler/icons-react";

export function App() {
  return (
    <Menu
      options={[
        {
          addon: <IconUser size={16} />,
          group: {
            label: "My Account",
          },
          label: "View Profile",
        },
        {
          addon: <IconLogout size={16} />,
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
