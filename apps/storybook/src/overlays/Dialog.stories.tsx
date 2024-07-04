import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Flex,
} from "@optiaxiom/react";
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

const LongContentTemplate = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Flex>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <Dialog onOpenChange={handleClose} open={open}>
        <DialogContent onInteractOutside={handleClose}>
          <DialogTitle>Custom</DialogTitle>
          <DialogBody>
            This is a longer piece of content that demonstrates how the
            AlertDialog handles more text. It might wrap to multiple lines
            depending on the width of the dialog.This is a longer piece of
            content that demonstrates how the AlertDialog handles more text. It
            might wrap to multiple lines depending on the width of the
            dialog.This is a longer piece of content that demonstrates how the
            AlertDialog handles more text. It might wrap to multiple lines
            depending on the width of the dialog.This is a longer piece of
            content that demonstrates how the AlertDialog handles more text. It
            might wrap to multiple lines depending on the width of the
            dialog.This is a longer piece of content that demonstrates how the
            AlertDialog handles more text. It might wrap to multiple lines
            depending on the width of the dialog.This is a longer piece of
            content that demonstrates how the AlertDialog handles more text. It
            might wrap to multiple lines depending on the width of the
            dialog.This is a longer piece of content that demonstrates how the
            AlertDialog handles more text. It might wrap to multiple lines
            depending on the width of the dialog.This is a longer piece of
            content that demonstrates how the AlertDialog handles more text. It
            might wrap to multiple lines depending on the width of the
            dialog.This is a longer piece of content that demonstrates how the
            AlertDialog handles more text. It might wrap to multiple lines
            depending on the width of the dialog.
          </DialogBody>
          <DialogFooter pt="20">
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleClose} preset="primary">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Flex>
  );
};

const Template = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Flex>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <Dialog onOpenChange={handleClose} open={open}>
        <DialogContent onInteractOutside={handleClose}>
          <DialogTitle>Custom</DialogTitle>
          <DialogBody>This is a short content.</DialogBody>
          <DialogFooter>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleClose} preset="primary">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Flex>
  );
};

export const Default: Story = {
  render: Template,
};

export const LongContent: Story = {
  render: LongContentTemplate,
};
