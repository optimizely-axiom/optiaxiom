import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentPropsWithoutRef } from "react";

import {
  AxiomProvider,
  Button,
  createToaster,
  Flex,
  Toast,
  ToastAction,
  ToastProvider,
  ToastTitle,
} from "@optiaxiom/react";
import { action } from "@storybook/addon-actions";
import { expect, screen, userEvent, waitFor, within } from "@storybook/test";

const toaster = createToaster();

type Story = StoryObj<StoryProps>;

export default {
  args: {
    children: <ToastTitle>This is an example toast message.</ToastTitle>,
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
        <Story />
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
  render: (args) => (
    <Button onClick={() => toaster.create(<Toast {...args} />)}>
      Show Toast
    </Button>
  ),
} as Meta<StoryProps>;

type StoryProps = ComponentPropsWithoutRef<typeof Toast> &
  Pick<ComponentPropsWithoutRef<typeof ToastProvider>, "position">;

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
  render: (args) => {
    return (
      <Flex flexDirection="row">
        <Button
          onClick={() => toaster.create(<Toast {...args} intent="neutral" />)}
        >
          Neutral
        </Button>
        <Button
          onClick={() =>
            toaster.create(<Toast {...args} intent="information" />)
          }
        >
          Information
        </Button>
        <Button
          onClick={() => toaster.create(<Toast {...args} intent="warning" />)}
        >
          Warning
        </Button>
        <Button
          onClick={() => toaster.create(<Toast {...args} intent="danger" />)}
        >
          Danger
        </Button>
        <Button
          onClick={() => toaster.create(<Toast {...args} intent="success" />)}
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

    await expect(
      await within(await screen.findByRole("list")).findByRole("status"),
    ).toHaveTextContent("This is an example toast message.");
    await expect(
      await screen.findByRole("button", { name: "Undo" }),
    ).toBeInTheDocument();
  },
};

export const Link: Story = {
  args: {
    children: (
      <>
        <ToastTitle>
          This is an <a href="data:,">example toast</a> message.
        </ToastTitle>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Show Toast"));

    const toast = await within(await screen.findByRole("list")).findByRole(
      "status",
    );
    await expect(toast).toHaveTextContent("This is an example toast message.");
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

    await expect(
      await within(await screen.findByRole("list")).findByRole("status"),
    ).toHaveTextContent(
      "This is an example toast message that should span two lines.",
    );
  },
};
