import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@optiaxiom/react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export function App() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem icon={<IconPencil />}>Edit</DropdownMenuItem>
        <DropdownMenuItem colorScheme="danger" icon={<IconTrash />}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
