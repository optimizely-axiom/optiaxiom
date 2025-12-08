import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box, Field, Group, Text } from "@optiaxiom/react";
import { Range } from "@optiaxiom/react/unstable";
import { useState } from "react";
import { expect, screen, userEvent, waitFor } from "storybook/internal/test";

export default {
  args: {
    "aria-label": "Label",
    defaultValue: 50,
  },
  component: Range,
  decorators: (Story) => (
    <Box w="384">
      <Story />
    </Box>
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=17463-7993&m=dev",
    },
  },
} as Meta<typeof Range>;

type Story = StoryObj<typeof Range>;

export const Basic: Story = {};

export const MinMax: Story = {
  args: {
    max: 70,
    min: 40,
  },
};

export const Step: Story = {
  args: {
    step: 10,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithField: Story = {
  args: {
    "aria-label": undefined,
  },
  decorators: (Story) => (
    <Field description="Adjust the volume level" label="Volume">
      <Story />
    </Field>
  ),
};

export const Controlled: Story = {
  render: function ControlledRange(args) {
    const [value, setValue] = useState(50);
    return (
      <Group flexDirection="column" fontSize="md" gap="16">
        <Range {...args} onValueChange={setValue} value={value} />
        <Text>Value: {value}</Text>
      </Group>
    );
  },
};

export const Marks: Story = {
  args: {
    marks: [
      { label: "20%", value: 20 },
      { label: "50%", value: 50 },
      { label: "80%", value: 80 },
    ],
    step: 10,
  },
};

export const WithTooltip: Story = {
  args: {
    showTooltip: true,
  },
  play: async ({ canvas, step }) => {
    await step("Tooltip appears on focus", async () => {
      canvas.getByRole("slider").focus();
      await waitFor(() =>
        expect(screen.getByRole("tooltip", { name: "50" })).toBeInTheDocument(),
      );
      canvas.getByRole("slider").blur();
      await waitFor(() =>
        expect(
          screen.queryByRole("tooltip", { name: "50" }),
        ).not.toBeInTheDocument(),
      );
    });
    await step("Tooltip appears on hover", async () => {
      await userEvent.hover(canvas.getByRole("slider"));
      await waitFor(() =>
        expect(screen.getByRole("tooltip", { name: "50" })).toBeInTheDocument(),
      );
      await userEvent.unhover(canvas.getByRole("slider"));
      await waitFor(() =>
        expect(
          screen.queryByRole("tooltip", { name: "50" }),
        ).not.toBeInTheDocument(),
      );
    });
    await step("Tooltip persists on leave if already focused", async () => {
      canvas.getByRole("slider").focus();
      await userEvent.hover(canvas.getByRole("slider"));
      await waitFor(() =>
        expect(screen.getByRole("tooltip", { name: "50" })).toBeInTheDocument(),
      );
      await userEvent.unhover(canvas.getByRole("slider"));
      await waitFor(() =>
        expect(screen.getByRole("tooltip", { name: "50" })).toBeInTheDocument(),
      );
      canvas.getByRole("slider").blur();
      await waitFor(() =>
        expect(
          screen.queryByRole("tooltip", { name: "50" }),
        ).not.toBeInTheDocument(),
      );
    });
  },
};
