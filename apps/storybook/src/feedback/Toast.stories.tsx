import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Flex,
  Toast,
  ToastAction,
  ToastTitle,
  Toaster,
} from "@optiaxiom/react";
import { action } from "@storybook/addon-actions";
import { expect, userEvent, within } from "@storybook/test";
import { type ComponentPropsWithoutRef, useState } from "react";

type StoryProps = ComponentPropsWithoutRef<typeof Toast> &
  Pick<ComponentPropsWithoutRef<typeof Toaster>, "position">;

export default {
  argTypes: {
    position: {
      control: "radio",
      options: [
        "bottom",
        "bottom-left",
        "bottom-right",
        "top",
        "top-left",
        "top-right",
      ],
    },
  },
  args: {
    children: <ToastTitle>This is an example toast message.</ToastTitle>,
  },
  component: Toast,
  render: function Render({ position, ...args }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
      <Flex flexDirection="column" gap="4">
        <Button onClick={handleOpen}>Show Toast</Button>

        <Toaster position={position}>
          <Toast {...args} onOpenChange={handleClose} open={open} />
        </Toaster>
      </Flex>
    );
  },
} as Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Basic: Story = {};

export const Success: Story = {
  args: {
    colorScheme: "success",
  },
};

export const Warning: Story = {
  args: {
    colorScheme: "warning",
  },
};

export const Danger: Story = {
  args: {
    colorScheme: "danger",
  },
};

export const Position: Story = {
  args: {
    position: "top-left",
  },
};

export const Action: Story = {
  args: {
    children: (
      <>
        <ToastTitle>This is an example toast message.</ToastTitle>
        <ToastAction altText="Undo" onClick={action("undo")}>
          Undo
        </ToastAction>
      </>
    ),
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <ToastTitle>
        This is an example toast message that should span two lines.
      </ToastTitle>
    ),
  },
};

export const Interactive: Story = {
  play: async ({ canvas }) => {
    const showToastButton = canvas.getByText("Show Toast");
    await userEvent.click(showToastButton);

    const toast = await canvas.findByRole("status");
    await expect(toast).toBeInTheDocument();
    await expect(toast).toHaveTextContent("This is an example toast message.");

    await userEvent.click(within(toast).getByRole("button", { name: "close" }));
    await expect(toast).not.toBeInTheDocument();
  },
};
