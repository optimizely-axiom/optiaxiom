import { Menu, MenuContent, MenuItem, MenuTrigger } from "@optiaxiom/react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export function App() {
  return (
    <Menu>
      <MenuTrigger>Open</MenuTrigger>

      <MenuContent>
        <MenuItem startDecorator={<IconPencil />}>Edit</MenuItem>
        <MenuItem colorScheme="danger" startDecorator={<IconTrash />}>
          Delete
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
