import type { Meta, StoryObj } from "@storybook/react";

import { AlertDialog, Button, Flex } from "@optiaxiom/react";
import { expect, screen, userEvent, within } from "@storybook/test";
import { useState } from "react";

const meta: Meta<typeof AlertDialog> = {
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  component: AlertDialog,
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

const Template = (args: React.ComponentProps<typeof AlertDialog>) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Flex>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <AlertDialog
        {...args}
        onAction={() => {
          handleClose();
        }}
        onCancel={() => {
          handleClose();
        }}
        open={open}
      >
        {args.children}
      </AlertDialog>
    </Flex>
  );
};

export const Default: Story = {
  args: {
    children: "Are you sure you want to delete this image?",
    title: "Delete Image",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(
      await screen.findByRole("alertdialog", { name: "Delete Image" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Confirm" }),
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await expect(
      screen.queryByRole("alertdialog", { name: "Delete Image" }),
    ).not.toBeInTheDocument();
  },
  render: Template,
};

export const CustomButtons: Story = {
  args: {
    ...Default.args,
    action: "Yes, Delete",
    cancel: "No, Keep",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(
      await screen.findByRole("alertdialog", { name: "Delete Image" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Yes, Delete" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "No, Keep" }),
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "No, Keep" }));
    await expect(
      screen.queryByRole("alertdialog", { name: "Delete Image" }),
    ).not.toBeInTheDocument();
  },
  render: Template,
};

export const LongContent: Story = {
  args: {
    ...Default.args,
    children:
      "This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(
      await screen.findByRole("alertdialog", { name: "Delete Image" }),
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await expect(
      screen.queryByRole("alertdialog", { name: "Delete Image" }),
    ).not.toBeInTheDocument();
  },
  render: Template,
};

export const LargeDialog: Story = {
  args: {
    ...Default.args,
    children:
      "This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.",
    size: "lg",
  },
  render: Template,
};

export const SmallDialog: Story = {
  args: {
    size: "sm",
    ...Default.args,
    children:
      "This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.",
  },
  render: Template,
};
