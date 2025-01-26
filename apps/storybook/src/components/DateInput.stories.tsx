import type { Meta, StoryObj } from "@storybook/react";

import { DateInput } from "@optiaxiom/react/unstable";

export default {
  component: DateInput,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=5743-27400",
    },
  },
} as Meta<typeof DateInput>;

type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  args: {
    placeholder: "Select date",
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "2025-01-22",
  },
};

export const WithMinMaxDates: Story = {
  args: {
    defaultValue: "2025-01-22",
    max: "2025-12-31",
    min: "2025-01-01",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "2025-01-22",
    disabled: true,
  },
};

export const WithCustomFormat: Story = {
  args: {
    defaultValue: "2025-01-22",
    placeholder: "YYYY-MM-DD",
  },
};
