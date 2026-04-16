"use client";

import { IconDelete, IconEdit } from "@optiaxiom/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Menu,
  MenuContent,
  MenuTrigger,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <Menu
      options={[
        {
          addon: <IconEdit />,
          label: "Edit",
        },
        {
          addon: <IconDelete />,
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
