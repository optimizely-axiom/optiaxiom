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

const withRender = ({
  position,
}: ComponentPropsWithoutRef<typeof Toaster> = {}) =>
  function Render(args: ComponentPropsWithoutRef<typeof Toast>) {
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
  };

export default {
  args: {
    children: <ToastTitle>This is an example toast message.</ToastTitle>,
  },
  component: Toast,
  render: withRender(),
} as Meta<typeof Toast>;

type Story = StoryObj<typeof Toast>;

export const Basic: Story = {};

export const Success: Story = {
  args: {
    type: "success",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
  },
};

export const Danger: Story = {
  args: {
    type: "danger",
  },
};

export const Position: Story = {
  render: withRender({ position: "top-left" }),
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
