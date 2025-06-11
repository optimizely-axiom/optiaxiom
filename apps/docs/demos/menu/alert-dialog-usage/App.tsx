"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@optiaxiom/react";
import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react/unstable";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <Menu
      options={[
        {
          addon: <IconPencil size={16} />,
          label: "Edit",
        },
        {
          addon: <IconTrash size={16} />,
          execute: () => setOpen(true),
          intent: "danger",
          label: "Delete",
        },
      ]}
    >
      <MenuTrigger>Open</MenuTrigger>
      <MenuContent />

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
    </Menu>
  );
}
