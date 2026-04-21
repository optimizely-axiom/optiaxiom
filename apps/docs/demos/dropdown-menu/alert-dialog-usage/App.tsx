"use client";

import { IconPen, IconTrashCan } from "@optiaxiom/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem icon={<IconPen />}>Edit</DropdownMenuItem>
        <DropdownMenuItem
          icon={<IconTrashCan />}
          intent="danger"
          onSelect={() => setOpen(true)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>

      <AlertDialog onOpenChange={setOpen} open={open}>
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
    </DropdownMenu>
  );
}
