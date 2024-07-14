import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogTitle,
  Flex,
} from "@optiaxiom/react";
import { expect, screen, userEvent, within } from "@storybook/test";
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

const DialogTemplate = ({
  content,
  description,
  size,
  withCloseButton = false,
  ...props
}: {
  content: string;
  description?: string;
  size: "lg" | "md" | "sm";
  withCloseButton?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Flex>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <Dialog
        onClose={handleClose}
        open={open}
        size={size}
        withCloseButton={withCloseButton}
        {...props}
      >
        <DialogTitle description={description}>Dialog</DialogTitle>
        <DialogBody>{content}</DialogBody>
        <DialogFooter>
          <Button appearance="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={handleClose}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </Flex>
  );
};

const LongContent =
  "This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.";

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const dialog = await screen.findByRole("dialog", { name: "Dialog" });
    await expect(dialog).toBeInTheDocument();

    await expect(
      screen.getByRole("button", { name: "Confirm" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Cancel" }),
    ).toBeInTheDocument();

    const ariaLabelledBy = dialog.getAttribute("aria-labelledby");
    await expect(ariaLabelledBy).not.toBeNull();
    if (ariaLabelledBy) {
      const descriptionElement = document.getElementById(ariaLabelledBy);
      await expect(descriptionElement).not.toBeNull();
      await expect(descriptionElement?.textContent).toBe("Dialog");
    }

    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    await expect(
      screen.queryByRole("dialog", { name: "Dialog" }),
    ).not.toBeInTheDocument();
  },
  render: (args) => (
    <DialogTemplate
      {...args}
      content="This is a default (medium) size dialog."
      size="md"
    />
  ),
};

export const DefaultWithDescription: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const dialog = await screen.findByRole("dialog", { name: "Dialog" });
    await expect(dialog).toBeInTheDocument();

    await expect(
      screen.getByRole("button", { name: "Confirm" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Cancel" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Close" }),
    ).toBeInTheDocument();

    const ariaLabelledBy = dialog.getAttribute("aria-labelledby");
    await expect(ariaLabelledBy).not.toBeNull();
    if (ariaLabelledBy) {
      const descriptionElement = document.getElementById(ariaLabelledBy);
      await expect(descriptionElement).not.toBeNull();
      await expect(descriptionElement?.textContent).toBe("Dialog");
    }

    const ariaDescribedBy = dialog.getAttribute("aria-describedby");
    await expect(ariaDescribedBy).not.toBeNull();
    if (ariaDescribedBy) {
      const descriptionElement = document.getElementById(ariaDescribedBy);
      await expect(descriptionElement).not.toBeNull();
      await expect(descriptionElement?.textContent).toBe("Description");
    }

    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    await expect(
      screen.queryByRole("dialog", { name: "Dialog" }),
    ).not.toBeInTheDocument();
  },
  render: (args) => (
    <DialogTemplate
      {...args}
      content="This is a default (medium) size dialog."
      description="Description"
      size="md"
      withCloseButton
    />
  ),
};

export const SmallDialog: Story = {
  render: (args) => (
    <DialogTemplate
      {...args}
      content="This is a small size dialog."
      size="sm"
    />
  ),
};

export const LargeDialog: Story = {
  render: (args) => (
    <DialogTemplate
      {...args}
      content="This is a large size dialog."
      size="lg"
    />
  ),
};

export const DefaultDialogLongContent: Story = {
  render: (args) => (
    <DialogTemplate {...args} content={LongContent} size="md" />
  ),
};

export const SmallDialogLongContent: Story = {
  render: (args) => (
    <DialogTemplate {...args} content={LongContent} size="sm" />
  ),
};

export const LargeDialogLargeContent: Story = {
  render: (args) => (
    <DialogTemplate {...args} content={LongContent} size="lg" />
  ),
};
