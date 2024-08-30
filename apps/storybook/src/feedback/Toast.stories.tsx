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
      <>
        <Button onClick={() => toaster.create(<Toast {...args} />)}>
          Show Toast
        </Button>

        <ToastProvider position={position} toaster={toaster} />
      </>
    );
  },
} as Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Basic: Story = {};

export const Appearance: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Neutral"));
    await userEvent.click(canvas.getByText("Success"));
    await userEvent.click(canvas.getByText("Warning"));
    await userEvent.click(canvas.getByText("Danger"));

    await waitFor(async () =>
      expect(await screen.findAllByRole("status")).toHaveLength(4),
    );
  },
  render: function Render({ position, ...args }) {
    return (
      <>
        <Flex flexDirection="row">
          <Button
            onClick={() =>
              toaster.create(<Toast {...args} colorScheme="neutral" />)
            }
          >
            Neutral
          </Button>
          <Button
            onClick={() =>
              toaster.create(<Toast {...args} colorScheme="success" />)
            }
          >
            Success
          </Button>
          <Button
            onClick={() =>
              toaster.create(<Toast {...args} colorScheme="warning" />)
            }
          >
            Warning
          </Button>
          <Button
            onClick={() =>
              toaster.create(<Toast {...args} colorScheme="danger" />)
            }
          >
            Danger
          </Button>
        </Flex>

        <ToastProvider position={position} toaster={toaster} />
      </>
    );
  },
};

export const Position: Story = {
  args: {
    position: "top-left",
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Show Toast"));

    await expect(await screen.findByRole("status")).toHaveTextContent(
      "This is an example toast message.",
    );
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
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Show Toast"));

    await expect(await screen.findByRole("status")).toHaveTextContent(
      "This is an example toast message.",
    );
    await expect(
      await screen.findByRole("button", { name: "Undo" }),
    ).toBeInTheDocument();
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
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Show Toast"));

    await expect(await screen.findByRole("status")).toHaveTextContent(
      "This is an example toast message that should span two lines.",
    );
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
