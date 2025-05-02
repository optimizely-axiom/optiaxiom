import type { Meta, StoryObj } from "@storybook/react";

import { Button, Field, Flex, Text } from "@optiaxiom/react";
import { DateInput } from "@optiaxiom/react/unstable";
import { expect, screen, userEvent, waitFor } from "@storybook/test";
import { useState } from "react";

export default {
  component: DateInput,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=5743-27573",
    },
  },
} as Meta<typeof DateInput>;

type Story = StoryObj<typeof DateInput>;

export const Basic: Story = {};

export const WithLabel: Story = {
  decorators: (Story) => (
    <Field label="Label">
      <Story />
    </Field>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(
      await canvas.findByRole("img", { name: "Show date picker" }),
    );
    (await screen.findByText("15")).click();
    const date = new Date();
    await expect(canvas.getByLabelText("Label")).toHaveValue(
      date.getFullYear() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-15",
    );

    await userEvent.click(canvas.getByLabelText("Label"));
    await userEvent.click(await screen.findByRole("button", { name: "Clear" }));
    await expect(canvas.getByLabelText("Label")).toHaveValue("");
  },
};

export const DefaultValue: Story = {
  args: {
    defaultValue: "2025-01-22",
  },
};

export const Controlled: Story = {
  render: function Sample(args) {
    const [value, setValue] = useState("");

    return (
      <Flex flexDirection="column" gap="12" w="224">
        <DateInput
          {...args}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          value={value}
        />
        <Text fontSize="md">Current value: {value}</Text>
        <Button
          alignSelf="start"
          disabled={!value}
          onClick={() => setValue("")}
        >
          Clear
        </Button>
      </Flex>
    );
  },
};

export const MinMaxDates: Story = {
  args: {
    defaultValue: "2025-01-22",
    max: "2025-01-28",
    min: "2025-01-07",
  },
  play: async ({ canvas }) => {
    await userEvent.click(
      await canvas.findByRole("img", { name: "Show date picker" }),
    );
    await waitFor(
      async () =>
        await expect(await screen.findByText("January 2025")).toBeVisible(),
    );
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "2025-01-22",
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    defaultValue: "2025-01-22",
    required: true,
  },
  play: async ({ canvas }) => {
    await userEvent.click(
      await canvas.findByRole("img", { name: "Show date picker" }),
    );
    await waitFor(
      async () =>
        await expect(await screen.findByText("January 2025")).toBeVisible(),
    );
  },
};

export const WithTime: Story = {
  args: {
    defaultValue: "2025-01-22T10:10",
    step: "300",
    type: "datetime-local",
  },
  play: async ({ canvas }) => {
    await userEvent.click(
      await canvas.findByRole("img", { name: "Show date picker" }),
    );
    await waitFor(
      async () =>
        await expect(
          await screen.findByRole("button", { name: "Done" }),
        ).toBeVisible(),
    );
  },
};
