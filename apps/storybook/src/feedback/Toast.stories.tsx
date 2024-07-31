import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentPropsWithoutRef } from "react";

import {
  Button,
  Flex,
  Toast,
  ToastAction,
  ToastProvider,
  ToastTitle,
  createToaster,
} from "@optiaxiom/react";
import { action } from "@storybook/addon-actions";
import { expect, screen, userEvent, waitFor, within } from "@storybook/test";

type StoryProps = ComponentPropsWithoutRef<typeof Toast> &
  Pick<ComponentPropsWithoutRef<typeof ToastProvider>, "position">;

const toaster = createToaster();

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
    return (
      <Flex flexDirection="column" gap="4">
        <Button onClick={() => toaster.create(<Toast {...args} />)}>
          Show Toast
        </Button>

        <ToastProvider position={position} toaster={toaster} />
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
    await userEvent.click(canvas.getByText("Show Toast"));

    const toast = await screen.findByRole("status");
    await expect(toast).toHaveTextContent("This is an example toast message.");

    await userEvent.click(within(toast).getByRole("button", { name: "close" }));
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument(),
    );
  },
};
