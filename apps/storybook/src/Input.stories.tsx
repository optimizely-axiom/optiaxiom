import type { Meta, StoryObj } from "@storybook/react";

import { Input, Stack } from "@optiaxiom/react";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components / Input",
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  args: {
    bg: "brand.50",
    disabled: false,
    id: "id-1",
    label: "Field label",
    m: "lg",
    p: "sm",
    placeholder: "Placeholder",
    rounded: "sm",
    variant: "text",
  },

  render: () => (
    <Stack flexDirection="column" gap="xl">
      <Input
        bg="brand.50"
        id="id-1"
        label="Label"
        p="sm"
        placeholder="Placeholder with label"
        rounded="sm"
        variant="text"
      />
      <Input
        bg="brand.50"
        id="id-1"
        label="Label"
        p="sm"
        placeholder="Placeholder"
        required
        rounded="sm"
        variant="text"
      />
      <Input
        bg="brand.50"
        id="id-1"
        p="sm"
        placeholder="Placeholder without label"
        rounded="sm"
        variant="text"
      />
      <Input
        bg="brand.50"
        id="id-1"
        label="Label"
        note="This is a note."
        p="sm"
        placeholder="Placeholder with notes"
        rounded="sm"
        variant="text"
      />
    </Stack>
  ),
};

export const NumberInput: Story = {
  args: {
    bg: "brand.50",
    id: "id-1",
    p: "sm",
    placeholder: "Placeholder",
    rounded: "sm",
    variant: "number",
  },
};
