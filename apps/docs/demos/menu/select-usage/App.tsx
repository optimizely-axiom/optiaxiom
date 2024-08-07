import {
  Flex,
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
  Text,
} from "@optiaxiom/react";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useState } from "react";

export function App() {
  const [selected, setSelected] = useState("");

  return (
    <Flex flexDirection="row">
      <Menu>
        <MenuTrigger>Open</MenuTrigger>

        <MenuContent>
          <MenuLabel>My Account</MenuLabel>
          <MenuItem
            onSelect={() => setSelected("view")}
            startDecorator={<IconUser />}
          >
            View Profile
          </MenuItem>
          <MenuSeparator />
          <MenuItem
            onSelect={() => setSelected("logout")}
            startDecorator={<IconLogout />}
          >
            Logout
          </MenuItem>
        </MenuContent>
      </Menu>

      <Text>Last selected item: {selected}</Text>
    </Flex>
  );
}
