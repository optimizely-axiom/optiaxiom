import type { Meta, StoryObj } from "@storybook/react";

import { Field, Input } from "@optiaxiom/react";
import { IconCalendar } from "@tabler/icons-react";

export default {
  component: Field,
} as Meta<typeof Field>;

type Story = StoryObj<typeof Field>;

export const Basic: Story = {
  args: {
    children: <Input placeholder="This is an Input" />,
    hint: "Give a proper input",
    label: "Form label",
  },
};

export const Required: Story = {
  args: {
    children: (
      <Input
        placeholder="With Icon"
        startDecorator={<IconCalendar size="16" />}
      />
    ),
    hint: "Give a proper input",
    label: "Form label",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: <Input placeholder="Disabled" />,
    disabled: true,
    label: "Form label",
  },
};

export const Error: Story = {
  args: {
    children: <Input placeholder="With error" />,
    error: "Form note",
    label: "Form label",
  },
};

export const Description: Story = {
  args: {
    children: <Input placeholder="With description" />,
    description: "Form note",
    label: "Form label",
  },
};

export const DescriptionAndError: Story = {
  args: {
    children: <Input placeholder="With error" />,
    description: "Form note",
    error: "There is an error",
    label: "Form label",
  },
};
