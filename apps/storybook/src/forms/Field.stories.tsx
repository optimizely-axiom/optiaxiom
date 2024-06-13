import type { Meta, StoryObj } from "@storybook/react";

import { Field, Input } from "@optiaxiom/react";
import { IconCalendar } from "@tabler/icons-react";

const meta: Meta<typeof Field> = {
  component: Field,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Field>;

export const InputWithIcon: Story = {
  render: () => (
    <Field label="Form label" required>
      <Input leftSection={<IconCalendar size="16" />} placeholder="With Icon" />
    </Field>
  ),
};

export const BasicInput: Story = {
  render: () => (
    <Field label="Form label">
      <Input placeholder="This is an Input" />
    </Field>
  ),
};

export const DisabledInput: Story = {
  render: () => (
    <Field disabled label="Form label">
      <Input placeholder="Disabled" />
    </Field>
  ),
};
export const ErrorInput: Story = {
  render: () => (
    <Field error="Form note" label="Form label">
      <Input placeholder="With error" />
    </Field>
  ),
};
