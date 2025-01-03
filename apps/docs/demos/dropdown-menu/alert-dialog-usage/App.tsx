import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              icon={<IconTrash />}
              intent="danger"
              onSelect={(event) => event.preventDefault()}
            >
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>Are you sure?</AlertDialogHeader>
            <AlertDialogBody>
              The task and all content will be deleted.
            </AlertDialogBody>
            <AlertDialogFooter>
              <AlertDialogCancel />
              <AlertDialogAction>Yes, delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
