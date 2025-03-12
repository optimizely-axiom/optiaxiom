import type { Meta, StoryObj } from "@storybook/react";

import { Field } from "@optiaxiom/react";
import { DateInput } from "@optiaxiom/react/unstable";
import { expect, screen, userEvent } from "@storybook/test";

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
      await canvas.findByRole("button", { name: "Show date picker" }),
    );
    await userEvent.click(await screen.findByText("15"));
    const date = new Date();
    await expect(canvas.getByLabelText("Label")).toHaveValue(
      date.getFullYear() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-15",
    );

    await userEvent.click(
      canvas.getByRole("button", { name: "Show date picker" }),
    );
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    await expect(canvas.getByLabelText("Label")).toHaveValue("");
  },
};

export const DefaultValue: Story = {
  args: {
    defaultValue: "2025-01-22",
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
      await canvas.findByRole("button", { name: "Show date picker" }),
    );
    await screen.findByRole("button", { name: "Clear" });
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "2025-01-22",
    disabled: true,
  },
};
