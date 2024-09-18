import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
  Text,
} from "@optiaxiom/react";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useState } from "react";

export function App() {
  const [selected, setSelected] = useState("");

  return (
    <Flex flexDirection="row">
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem
            addonBefore={<IconUser />}
            onSelect={() => setSelected("view")}
          >
            View Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            addonBefore={<IconLogout />}
            onSelect={() => setSelected("logout")}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Text>Last selected item: {selected}</Text>
    </Flex>
  );
}
