import { IconArrowRightFromBracket, IconUser } from "@optiaxiom/icons";
import {
  AngleMenuButton,
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
        <AngleMenuButton>My account</AngleMenuButton>
      </MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
