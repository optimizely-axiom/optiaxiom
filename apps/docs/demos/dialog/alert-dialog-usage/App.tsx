"use client";

import {
  Alert,
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogForm,
  DialogHeader,
  DialogTrigger,
  Textarea,
} from "@optiaxiom/react";
import { useRef, useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open && textRef.current?.value) {
          setAlertOpen(true);
        } else {
          setOpen(open);
        }
      }}
      open={open}
    >
      <DialogTrigger>Create new issue</DialogTrigger>

      <DialogContent size="sm">
        <DialogHeader>Create new issue</DialogHeader>

        <DialogForm
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <DialogBody>
            <Alert intent="warning">
              Type something into the text field and then attempt to cancel the
              dialog:
            </Alert>

            <Textarea autoFocus ref={textRef} required />
          </DialogBody>

          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <Button appearance="primary">Save</Button>
          </DialogFooter>
        </DialogForm>
      </DialogContent>

      <AlertDialog onOpenChange={setAlertOpen} open={alertOpen}>
        <AlertDialogContent onCloseAutoFocus={() => textRef.current?.focus()}>
          <AlertDialogHeader>Discard issue?</AlertDialogHeader>
          <AlertDialogBody>All unsaved changes will be lost.</AlertDialogBody>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep editing</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen(false)}>
              Yes, discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
