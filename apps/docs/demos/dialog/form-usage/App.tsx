"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogForm,
  DialogHeader,
  DialogTrigger,
  Field,
  Input,
  Textarea,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Dialog onOpenChange={loading ? undefined : setOpen} open={open}>
      <DialogTrigger>Create new issue</DialogTrigger>

      <DialogContent size="sm">
        <DialogHeader>Create new issue</DialogHeader>

        <DialogForm
          onSubmit={(event) => {
            event.preventDefault();
            setLoading(true);
            // use form data to perform a server action
            setTimeout(() => {
              setLoading(false);
              setOpen(false);
            }, 3000);
          }}
        >
          <DialogBody>
            <Field label="Title">
              <Input autoFocus name="title" required />
            </Field>
            <Field label="Description">
              <Textarea name="description" required />
            </Field>
          </DialogBody>

          <DialogFooter>
            <DialogClose disabled={loading}>Cancel</DialogClose>
            <Button
              appearance="primary"
              disabled={loading}
              loading={loading}
              type="submit"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogForm>
      </DialogContent>
    </Dialog>
  );
}
