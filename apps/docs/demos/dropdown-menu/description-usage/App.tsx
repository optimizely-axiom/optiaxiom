import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@optiaxiom/react";

export function App() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem description="Create a new task">
          New task
        </DropdownMenuItem>
        <DropdownMenuItem description="Copy this task">
          Copy task
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem colorScheme="danger">Delete task</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
