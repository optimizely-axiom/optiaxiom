import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentPropsWithoutRef } from "react";

import {
  AxiomProvider,
  Button,
  createToaster,
  Flex,
  Toast,
  ToastProvider,
} from "@optiaxiom/react";
import { action } from "storybook/actions";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const toaster = createToaster();

type Story = StoryObj<StoryProps>;

export default {
  args: {
    message: "This is an example toast message.",
  },
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
  component: Toast,
  decorators: [
    (Story, context) => (
      <AxiomProvider toast={{ position: context.args.position, toaster }}>
        <div
          style={{
            display: "grid",
            height: "max(512px, calc(100dvh - 2rem))",
            placeItems: "center",
            width: "max(512px, calc(100dvw - 2rem))",
          }}
        >
          <Story />
        </div>
      </AxiomProvider>
    ),
    (Story) => {
      toaster.clear();
      return <Story />;
    },
  ],
  parameters: {
    useAxiomProvider: false,
  },
  render: ({ message, ...args }) => (
    <Button onClick={() => toaster.create(message, args)}>Show Toast</Button>
  ),
} as Meta<StoryProps>;

type StoryProps = Parameters<typeof toaster.create>[1] &
  Pick<ComponentPropsWithoutRef<typeof ToastProvider>, "position"> & {
    message: string;
  };

export const Basic: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Show Toast"));

    const toast = await within(await screen.findByRole("list")).findByRole(
      "status",
    );
    await expect(toast).toHaveTextContent("This is an example toast message.");

    await userEvent.click(within(toast).getByRole("button", { name: "close" }));
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument(),
    );

    await userEvent.click(canvas.getByText("Show Toast"));
    await waitFor(async () =>
      expect(
        await within(await screen.findByRole("list")).findByRole("status"),
      ).toBeVisible(),
    );
  },
};

export const Appearance: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Neutral"));
    await userEvent.click(canvas.getByText("Information"));
    await userEvent.click(canvas.getByText("Warning"));
    await userEvent.click(canvas.getByText("Danger"));
    await userEvent.click(canvas.getByText("Success"));

    await waitFor(async () =>
      expect(
        await within(screen.getByRole("list")).findAllByRole("status"),
      ).toHaveLength(5),
    );
  },
  render: ({ message, ...args }) => {
    return (
      <Flex flexDirection="row">
        <Button
          onClick={() => toaster.create(message, { ...args, type: "neutral" })}
        >
          Neutral
        </Button>
        <Button
          onClick={() =>
            toaster.create(message, { ...args, type: "information" })
          }
        >
          Information
        </Button>
        <Button
          onClick={() => toaster.create(message, { ...args, type: "warning" })}
        >
          Warning
        </Button>
        <Button
          onClick={() => toaster.create(message, { ...args, type: "danger" })}
        >
          Danger
        </Button>
        <Button
          onClick={() => toaster.create(message, { ...args, type: "success" })}
        >
          Success
        </Button>
      </Flex>
    );
  },
};

export const Position: Story = {
  args: {
    position: "top-left",
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Show Toast"));

    await expect(
      await within(await screen.findByRole("list")).findByRole("status"),
    ).toHaveTextContent("This is an example toast message.");
  },
};

export const Action: Story = {
  args: {
    action: "Undo",
    onAction: action("undo"),
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Show Toast"));

    await expect(
      await within(await screen.findByRole("list")).findByRole("status"),
    ).toHaveTextContent("This is an example toast message.");
    await expect(
      await screen.findByRole("button", { name: "Undo" }),
    ).toBeInTheDocument();
  },
};

export const LongContent: Story = {
  args: {
    message: "This is an example toast message that should span two lines.",
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Show Toast"));

    await expect(
      await within(await screen.findByRole("list")).findByRole("status"),
    ).toHaveTextContent(
      "This is an example toast message that should span two lines.",
    );
  },
};
