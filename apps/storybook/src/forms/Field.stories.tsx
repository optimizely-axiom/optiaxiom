import type { Meta, StoryObj } from "@storybook/react";

import { Field, Input } from "@optiaxiom/react";
import { IconCalendar } from "@tabler/icons-react";

const meta: Meta<typeof Field> = {
  component: Field,
};

export default meta;

type Story = StoryObj<typeof Field>;

export const InputWithIcon: Story = {
  args: {
    children: (
      <Input leftSection={<IconCalendar size="16" />} placeholder="With Icon" />
    ),
    label: "Form label",
    required: true,
  },
};

export const BasicInput: Story = {
  args: {
    children: <Input placeholder="This is an Input" />,
    label: "Form label",
  },
};

export const DisabledInput: Story = {
  args: {
    children: <Input placeholder="Disabled" />,
    disabled: true,
    label: "Form label",
  },
};

export const ErrorInput: Story = {
  args: {
    children: <Input placeholder="With error" />,
    error: "Form note",
    label: "Form label",
  },
};

export const InputWithDescription: Story = {
  args: {
    children: <Input placeholder="With description" />,
    description: "Form note",
    label: "Form label",
  },
};

export const InputWithDescriptionError: Story = {
  args: {
    children: <Input placeholder="With error" />,
    description: "Form note",
    error: "There is an error",
    label: "Form label",
  },
};
