import {
  Flex,
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
  Switch,
} from "@optiaxiom/react";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useState } from "react";

export function App() {
  const [keepOpen, setKeepOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Flex flexDirection="row">
      <Switch onCheckedChange={setKeepOpen}>Keep menu open</Switch>

      <Menu
        modal={false}
        onOpenChange={(flag) => setOpen(flag || keepOpen)}
        open={open}
      >
        <MenuTrigger>Open</MenuTrigger>

        <MenuContent>
          <MenuLabel>My Account</MenuLabel>
          <MenuItem startDecorator={<IconUser />}>View Profile</MenuItem>
          <MenuSeparator />
          <MenuItem startDecorator={<IconLogout />}>Logout</MenuItem>
        </MenuContent>
      </Menu>
    </Flex>
  );
}
